import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(400).json({
			success: false,
			message: "Unauthorized - no token provided",
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(400).json({
				success: false,
				message: "Unauthorized - Invalid Token",
			});
		}
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken : ", error);
		res.status(500).json({ success: false, message: error.message });
	}
};
