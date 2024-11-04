import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	error: null,
	message: null,
	isLoading: false,
	isCheckingAuth: true,
	isAuthenticated: false,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, {
				email,
				password,
				name,
			});
			set({
				user: response.data.user,
				isAuthenticated: true,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({
				error: error.response.data.message || "Error signing up",
				isLoading: false,
			});
			throw error;
		}
	},
	
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, {
				email,
				password,
			});
			set({
				user: response.data.user,
				isAuthenticated: true,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({
				error: error.response.data.message || "Error login",
				isLoading: false,
			});
			throw error;
		}
	},
	
	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/logout`);
			set({
				user: null,
				isLoading: false,
				error: null,
				isAuthenticated: false,
			});
			return response.data
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
	
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, {
				code,
			});
			set({
				user: response.data.user,
				isAuthenticated: true,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({
				error: error.response.data.message || "Error verifyEmail",
				isLoading: false,
			});
			throw error;
		}
	},
	
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({
				user: response.data.user,
				isAuthenticated: true,
				isCheckingAuth: false,
			});
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
}));