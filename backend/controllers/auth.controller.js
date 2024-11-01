import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";

import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js";

import {
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../nodemailer/email.js";

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExisted = await User.findOne({ email });
		if (userAlreadyExisted) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
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
			message: "User Created Successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const verifyEmail = async (req, res) => {
	const { code } = req.body; // get 6 digit code
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid or Expired verification code",
			});
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;

		await user.save();

		await sendWelcomeEmail(req, user.email, user.name);

		res.status(201).json({
			success: true,
			message: "Email Verify Successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in verifyEmail : ", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credential" });
		}

		const isValidPassword = await bcryptjs.compare(password, user.password);
		if (!isValidPassword) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credential" });
		}

		generateTokenandSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(201).json({
			success: true,
			message: "Login Successfully",
			user: { ...user._doc, password: undefined },
		});
	} catch (error) {
		console.log("Error in verifyEmail : ", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(201).json({ success: true, message: "Logout Successfully" });
};
