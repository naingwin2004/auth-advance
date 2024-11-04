import { Loader } from "lucide-react"
import { motion } from "framer-motion";

import { formatDate } from "../utils/date";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
	const { user, logout, isLoading } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.5 }}
				className='max-w-2xl w-full mx-3 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'>
				<h2 className='text-3xl font-bold mb-6 text-center text-cappuccino-beige'>
					Dashboard
				</h2>

				<div className='space-y-6'>
					<motion.div
						className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}>
						<h3 className='text-xl font-semibold text-green-400 mb-3'>
							Profile Information
						</h3>
						<p className='text-gray-300'>Name: {user.name}</p>
						<p className='text-gray-300'>Email: {user.email}</p>
					</motion.div>
					<motion.div
						className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}>
						<h3 className='text-xl font-semibold text-green-400 mb-3'>
							Account Activity
						</h3>
						<p className='text-gray-300'>
							<span className='font-bold'>Joined: </span>
							{new Date(user.createdAt).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)}
						</p>
						<p className='text-gray-300'>
							<span className='font-bold'>Last Login: </span>

							{formatDate(user.lastLogin)}
						</p>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='mt-4'>
					<motion.button
						className='mt-5 w-full py-2 px-4 rounded-lg focus:border-cappuccino-dark focus:ring-2 focus:ring-cappuccino-dark text-white placeholder-cappuccino-dark transition duration-200 text-white outline-cappuccino-red shadow-lg hover:bg-cappuccino-brown bg-cappuccino-beige font-bold'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						onClick={handleLogout}
						disabled={isLoading}>
						{isLoading ? (
							<Loader
								className=' animate-spin mx-auto'
								size={24}
							/>
						) : (
							"Logout"
						)}
					</motion.button>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default DashboardPage;
