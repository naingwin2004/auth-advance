import { z } from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Lock, Mail, User } from "lucide-react";

import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";

const userSchema = z.object({
	name: z.string().nonempty("User name is required"),
	email: z.string().email("invalid email."),
	password: z
		.string()
		.min(6, "At least 6 characters")
		.regex(/[A-Z]/, "Contains uppercase letter")
		.regex(/[a-z]/, "Contains lowercase letter")
		.regex(/\d/, "Contains a number")
		.regex(/[^A-Za-z0-9]/, "Contains special character"),
});

const SignupPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ resolver: zodResolver(userSchema) });
	const userPassword = watch("password");

	const { signup, isLoading, error } = useAuthStore();

	const navigate = useNavigate();
	const singupform = async (data) => {
		const { email, password, name } = data;
		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8 }}
				className=' max-w-2xl w-full mx-3 bg-cappuccino-dark bg-opacity-80  backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center text-cappuccino-beige'>
						Create Account
					</h2>
					<form onSubmit={handleSubmit(singupform)}>
						<div className='flex flex-col gap-3'>
							{errors.name && (
								<p className='text-sm text-red-500'>
									{errors.name.message}
								</p>
							)}
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<User className='size-5 text-cappuccino-red' />
								</div>
								<input
									type='text'
									id='name'
									placeholder='FullName'
									{...register("name")}
									className='w-full pl-10 pr-3 py-2 rounded-lg focus:border-cappuccino-brown focus:ring-4 focus:ring-cappuccino-brown text-black placeholder-cappuccino-brown transition duration-200 text-black outline-cappuccino-red'
								/>
							</div>
							{errors.email && (
								<p className='text-sm text-red-500'>
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
									{...register("email")}
									className='w-full pl-10 pr-3 py-2 rounded-lg focus:border-cappuccino-brown focus:ring-4 focus:ring-cappuccino-brown text-black placeholder-cappuccino-brown transition duration-200 text-black outline-cappuccino-red'
								/>
							</div>
							{errors.password && (
								<p className='text-sm text-red-500'>
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
									className='w-full pl-10 pr-3 py-2 rounded-lg focus:border-cappuccino-brown focus:ring-4 focus:ring-cappuccino-brown text-black placeholder-cappuccino-brown transition duration-200 text-black outline-cappuccino-red'
								/>
							</div>
						</div>
						{error && (
							<p className='text-sm text-red-500 text-center mt-2'>
								{error}
							</p>
						)}
						<PasswordStrengthMeter password={userPassword} />
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
								"Sign Up"
							)}
						</motion.button>
					</form>
				</div>
				<div className='px-8 py-4 flex justify-center bg-gray-800'>
					<p className='text-sm text-gray-400'>
						Already have an account?{" "}
						<Link
							to={"/login"}
							className='text-cappuccino-beige hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default SignupPage;
