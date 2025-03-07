import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../SQLtables/users.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await User.findByPk(payload.id);
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		} catch (err) {
			return done(err, false);
		}
	})
);
export async function createJWT(user, password) {
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json("Неверный пароль");
	}
	const tocen = jwt.sign(
		{ id: user.id, role: user.role },
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
	return tocen;
}
export async function getUserID(token) {
	try {
		const userID = jwt.verify(token, secretKey);
		return userID.id;
	} catch (err) {
		console.log(err);
	}
}
export async function getUserRole(token) {
	try {
		const decoded = jwt.verify(token, secretKey);
		return decoded.role;
	} catch (err) {
		console.log(err);
	}
}
export default passport;
