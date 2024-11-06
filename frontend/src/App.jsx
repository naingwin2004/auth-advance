import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import {
	SignupPage,
	LoginPage,
	VerifyEmailPage,
	DashboardPage,
	ForgotPasswordPage,
	ResetPasswordPage,
} from "./pages/index.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useAuthStore } from "./store/authStore.js";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}
	if (isAuthenticated && !user.isVerified) {
		return (
			<Navigate
				to='/verify-email'
				replace
			/>
		);
	}
	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
	if (isAuthenticated && user.isVerified) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}
	return children;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<DashboardPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/signup",
		element: (
			<RedirectAuthenticatedUser>
				<SignupPage />
			</RedirectAuthenticatedUser>
		),
	},
	{
		path: "/login",
		element: (
			<RedirectAuthenticatedUser>
				<LoginPage />
			</RedirectAuthenticatedUser>
		),
	},
	{
		path: "/verify-email",
		element: (
			<RedirectAuthenticatedUser>
				<VerifyEmailPage />
			</RedirectAuthenticatedUser>
		),
	},
	{
		path: "/forgot-password",
		element: (
			<RedirectAuthenticatedUser>
				<ForgotPasswordPage />
			</RedirectAuthenticatedUser>
		),
	},
	{
		path: "/reset-password/:token",
		element: (
			<RedirectAuthenticatedUser>
				<ResetPasswordPage />
			</RedirectAuthenticatedUser>
		),
	},
	{ path: "*", element: <Navigate to='/' replace/> },
]);

const App = () => {
	const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-cappuccino-cream relative overflow-hidden'>
			<RouterProvider router={router} />
			<Toaster />
		</div>
	);
};

export default App;
