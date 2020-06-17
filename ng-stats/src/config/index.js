const isDeveloper = process.env.NODE_ENV === "development"

export const API_HOST = !isDeveloper
	? "http://localhost:5000"
	: "https://apiv2.nethergames.org"
