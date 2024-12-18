import { z } from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Loader, Lock, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore.js";

const LoginPage = () => {
	const userSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(userSchema) });

	const { login, isLoading, error } = useAuthStore();

	const navigate = useNavigate();
	const loginForm = async (data) => {
		const { email, password } = data;
		try {
			await login(email, password);
			navigate("/");
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
						Welcome Back
					</h2>
					<form onSubmit={handleSubmit(loginForm)}>
						<div className='flex flex-col gap-3'>
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
								"Login"
							)}
						</motion.button>
					</form>
					<div className='mt-2'>
						<Link
							to={"/forgot-password"}
							className='text-cappuccino-beige underline'>
							forgot-password?
						</Link>
					</div>
				</div>
				<div className='px-8 py-4 flex justify-center bg-gray-800'>
					<p className='text-sm text-gray-400'>
						Don't have an account?{" "}
						<Link
							to={"/signup"}
							className='text-cappuccino-beige hover:underline'>
							Sign Up
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
