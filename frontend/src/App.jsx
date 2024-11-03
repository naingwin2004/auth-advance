import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SignupPage, LoginPage, VerifyEmailPage } from "./pages/index.js";

const router = createBrowserRouter([
	{ path: "/", element: "Home" },
	{ path: "/check-auth", element: "Check Auth" },
	{ path: "/signup", element: <SignupPage /> },
	{ path: "/login", element: <LoginPage /> },
	{ path: "/logout", element: "logout" },
	{ path: "/verify-email", element: <VerifyEmailPage /> },
	{ path: "/forgot-password", element: "forgot-password" },
	{ path: "/reset-password/:token", element: "reset-password" },
]);

const App = () => {
	return (
		<div className='min-h-screen bg-cappuccino-cream relative overflow-hidden'>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
