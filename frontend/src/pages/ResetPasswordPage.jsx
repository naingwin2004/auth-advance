import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";

import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const userSchema = z
		.object({
			password: z
				.string()
				.min(6, "Password must be at least 6 characters"),
			confirmPassword: z
				.string()
				.min(6, "Password must be at least 6 characters"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userSchema),
	});

	const { resetPassword, error, isLoading, message } = useAuthStore();
	const { token } = useParams();
	const navigate = useNavigate();

	const handleResetPassword = async (data) => {
		try {
			await resetPassword(token, data.password);
			toast.success(
				"Password reset successfully, redirecting to login page...",
			);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-2xl mx-3 w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
						Reset Password
					</h2>
					{error && (
						<p className='text-red-500 text-sm mb-4'>{error}</p>
					)}
					{message && (
						<p className='text-green-500 text-sm mb-4'>{message}</p>
					)}

					<form onSubmit={handleSubmit(handleResetPassword)}>
						<div className='flex flex-col gap-3'>
							{errors.password && (
								<p className='text-red-500 text-sm mb-4'>
									{errors.password.message}
								</p>
							)}
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Lock className='size-5 text-cappuccino-red' />
								</div>
								<input
									type='password'
									id='password'
									placeholder='Password'
									{...register("password")}
									className='w-full pl-10 pr-3 py-2 rounded-lg focus:border-cappuccino-brown focus:ring-4 focus:ring-cappuccino-brown text-black placeholder-cappuccino-brown transition duration-200 outline-cappuccino-red'
								/>
							</div>
							{errors.confirmPassword && (
								<p className='text-red-500 text-sm mb-4'>
									{errors.confirmPassword.message}
								</p>
							)}
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Lock className='size-5 text-cappuccino-red' />
								</div>
								<input
									type='password'
									id='confirmPassword'
									placeholder='Confirm Password'
									{...register("confirmPassword")}
									className='w-full pl-10 pr-3 py-2 rounded-lg focus:border-cappuccino-brown focus:ring-4 focus:ring-cappuccino-brown text-black placeholder-cappuccino-brown transition duration-200 outline-cappuccino-red'
								/>
							</div>
							<motion.button
								className='mt-5 w-full py-2 px-4 rounded-lg focus:border-cappuccino-dark focus:ring-2 focus:ring-cappuccino-dark text-white transition duration-200 outline-cappuccino-red shadow-lg hover:bg-cappuccino-brown bg-cappuccino-beige font-bold'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type='submit'
								disabled={isLoading}>
								{isLoading ? (
									<span className='animate-spin mx-auto'>
										Loading...
									</span>
								) : (
									"Reset Password"
								)}
							</motion.button>
						</div>
					</form>
				</div>
			</motion.div>
		</div>
	);
};

export default ResetPasswordPage;
