import dotenv from "dotenv";

import nodemailer from "nodemailer";

import {
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplates.js";

dotenv.config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.SENDER_MAIL,
		pass: process.env.MAIL_PASS,
	},
});

export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_MAIL,
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationToken,
			),
		});
		console.log("Email verification sending successfully ", response);
	} catch (error) {
		console.log("Error sending verification email", error);
		throw new Error("Error sending verification email :", error);
	}
};

export const sendWelcomeEmail = async (req, email, name) => {
	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_MAIL,
			to: email,
			subject: "Welcome",
			html: WELCOME_EMAIL_TEMPLATE.replace("[Username]", name).replace(
				"[Link]",
				`${req.protocol}://${req.get("host")}`,
			),
		});
		console.log("Welcom email sending successfully :", response);
	} catch (error) {
		console.log("Error sending welcome email", error);
		throw new Error("Error sending welcome email :", error);
	}
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_MAIL,
			to: email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
				"{resetURL}",
				resetUrl,
			),
		});
		console.log(
			"password reset link email sending successfully :",
			response,
		);
	} catch (error) {
		console.log("Error sending resetpassword email", error);
		throw new Error("Error sending resetpassword email :", error);
	}
};

export const sendResetSuccessEmail = async (email)=>{
  try{
    const response = await transporter.sendMail({
      from:process.env.SENDER_MAIL,
      to:email,
      subject:"Reset password successfully",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE
    })
    console.log("resetpassword successfully :",response)
  }catch (error) {
		console.log("Error sending reset success email", error);
		throw new Error("Error sending reset success email :", error);
	}
}