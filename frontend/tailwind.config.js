/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				cappuccino: {
					brown: "#4b3832",
					red: "#854442",
					cream: "#fff4e6",
					dark: "#3c2f2f",
					beige: "#be9b7b",
				},
			},
		},
	},
	plugins: [],
};
