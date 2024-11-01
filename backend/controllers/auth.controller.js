import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";

import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js";

import { sendVerificationEmail } from "../nodemailer/email.js";

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		if (!email || !password || !name) {
			throw new Error("All fields are requried");
		}

		const userAlreadyExisted = await User.findOne({ email });
		if (userAlreadyExisted) {
			return res.status(400).json({
				success: false,
				message: "User already Exists",
			});
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		const verificationToken = Math.floor(
			100000 + Math.random() * 900000,
		).toString();

		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24h
		});

		await user.save();
		//jwt
		generateTokenandSetCookie(res, user._id);

		await sendVerificationEmail(user.email, verificationToken);

		return res.status(201).json({
			success: true,
			message: "User Created Successfuly",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const login = async (req, res) => {
	res.send("login Route");
};

export const logout = async (req, res) => {
	res.send("logout Route");
};
