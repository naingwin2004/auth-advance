import { useState } from "react";

import { motion } from "framer-motion";
import OtpInput from "react-otp-input";

const VerifyEmailPage = () => {
	const [otp, setOtp] = useState("");

	const handlePaste = (event) => {
		const data = event.clipboardData.getData("text");
		console.log(data);
	};

	const isLoading = false;

	return (
		<div className='h-screen flex justify-center items-center'>
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8 }}
				className='max-w-3xl w-full mx-3 bg-cappuccino-dark bg-opacity-80 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center text-cappuccino-beige'>
						Verify Your Email
					</h2>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className='py-2 flex justify-center items-center space-x-2'>
							<OtpInput
								value={otp}
								onChange={setOtp}
								onPaste={handlePaste}
								numInputs={6}
								shouldAutoFocus={true}
								renderSeparator={
									<span className='text-cappuccino-beige mx-1'>
										|
									</span>
								}
								renderInput={(inputProps) => (
									<input
										{...inputProps}
										className='w-9 h-9 text-center bg-white rounded-md border-2 border-gray-300 focus:border-cappuccino-brown focus:outline-none text-black font-semibold'
										style={{ width: "36px" }}
									/>
								)}
							/>
						</div>
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
								"Verify Email"
							)}
						</motion.button>
					</form>
				</div>
			</motion.div>
		</div>
	);
};

export default VerifyEmailPage;
