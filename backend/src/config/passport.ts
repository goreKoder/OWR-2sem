import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../SQLtables/users";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const secretKey = String(process.env.JWT_SECRET);
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secretKey,
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
export async function createJWT(user: any, password:string) {
	const isPasswordValid = await bcrypt.compare(password, user.password);
	const tocen = jwt.sign(
		{ id: user.id, role: user.role },
		secretKey,
		{
			expiresIn: "1h",
		}
	);
	return tocen;
}
export async function getUserID(token:string) {
	try {
		const userID = jwt.verify(token, secretKey) as JwtPayload;
		return userID.id;
	} catch (err) {
		console.log(err);
	}
}
export async function getUserRole(token:string) {
	try {
		const decoded = jwt.verify(token, secretKey) as JwtPayload;
		return String(decoded.role);
	} catch (err) {
		console.log(err);
	}
}
export default passport;
