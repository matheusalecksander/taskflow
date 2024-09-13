import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { getItem } from "../utils/localStorage";

const api = axios.create({
	baseURL: "http://localhost:5175/v1",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = getItem("token");
	if (token) {
		const headers = {
			Authorization: `Bearer ${token}`,
			...config.headers,
		} as unknown as AxiosHeaders;
		config.headers = headers;
	}

	return config;
});

export { api };
