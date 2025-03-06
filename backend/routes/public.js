import express from "express";
import User from "../SQLtables/users.js";
import Event from "../SQLtables/events.js";
import dotenv from "dotenv";
import { ValidationError, NotFoundError } from "../errors.js";

dotenv.config();
const router = express.Router();

router.get("/events", async (req, res) => {
	try {
		console.log("всё плохо");
		console.log(req.query);
		// GET http://localhost:5000/events?startdate=2023-10-25T10:00:00Z&enddate=2023-10-27T11:00:00Z
		const { startdate, enddate } = req.query;
		const events = await Event.findAll({
			where: {
				date: {
					[Op.between]: [new Date(startdate), new Date(enddate)],
				},
			},
		});
		res.status(200).json(events);
	} catch (err) {
		res.status(500).json("ошибка сервера" + err);
	}
});
router.get("/users", async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json("ошибка сервера");
	}
});
export default router;
