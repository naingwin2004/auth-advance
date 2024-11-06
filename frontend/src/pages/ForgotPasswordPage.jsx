import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { message, error, isLoading, forgotPassword } = useAuthStore();

	const handleForgotPassword = async (data) => {
		try {
			await forgotPassword(data.email);
			setEmail(data.email);
			setIsSubmitted(true);
			toast.success(message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-2xl w-full mx-3 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cappuccino-red to-cappuccino-beige text-transparent bg-clip-text'>
						Forgot Password
					</h2>

					{!isSubmitted ? (
						<form onSubmit={handleSubmit(handleForgotPassword)}>
							<p className='text-gray-300 mb-6 text-center'>
								Enter your email address and we'll send you a
								link to reset your password.
							</p>
							{errors.email && (
								<p className='text-red-500'>
									{errors.email.message}
								</p>
							)}
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Mail className='size-5 text-cappuccino-red' />
								</div>
								<input
									type='text'
									id='email'
									placeholder='Email'
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message:
												"Please enter a valid email address",
										},
									})}
									className='w-full pl-10 pr-3 py-2 rounded-lg focus:border-cappuccino-brown focus:ring-4 focus:ring-cappuccino-brown text-black placeholder-cappuccino-brown transition duration-200 text-black outline-cappuccino-red'
								/>
							</div>
							{error && (
								<p className='text-sm text-red-500 text-center'>
									{error}
								</p>
							)}
							<motion.button
								className='mt-5 w-full py-2 px-4 rounded-lg focus:border-cappuccino-dark focus:ring-2 focus:ring-cappuccino-dark text-white placeholder-cappuccino-dark transition duration-200 text-white outline-cappuccino-red shadow-lg hover:bg-cappuccino-brown bg-cappuccino-beige font-bold'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type='submit'
								disabled={isLoading}>
								{isLoading ? (
									<Loader
										className=' animate-spin mx-auto'
										size={24}
									/>
								) : (
									"Submit"
								)}
							</motion.button>
						</form>
					) : (
						<div className='text-center'>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30,
								}}
								className='w-16 h-16 bg-cappuccino-beige rounded-full flex items-center l justify-center mx-auto mb-4'>
								<Mail className='h-8 w-8 text-white text-cappuccino-red' />
							</motion.div>
							<p className='text-gray-300 mb-6'>
								If an account exists for {email}, you will
								receive a password reset link shortly.
							</p>
						</div>
					)}
				</div>

				<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
					<Link
						to={"/login"}
						className='text-sm text-cappuccino-beige hover:underline flex items-center'>
						<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
					</Link>
				</div>
			</motion.div>
		</div>
	);
};
export default ForgotPasswordPage;
