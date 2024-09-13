/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { LoginSchema } from "../validator/zod/loginSchema";
import { api } from "../../../_api";

export function useLogin() {
	const getItem = useCallback((key: string) => {
		return localStorage.getItem(key);
	}, []);

	const setItem = useCallback((key: string, value: string) => {
		localStorage.setItem(key, value);
	}, []);

	const login = useCallback(
		async (loginData: LoginSchema) => {
			try {
				const { data } = await api.post("/auth/login", loginData);

				setItem("token", data.access_token);
				window.location.assign("/tasks");
			} catch (error: any) {
				console.log(error);
				alert("Ocorreu um erro ao logar");
				return null;
			}
		},
		[setItem],
	);

	return {
		login,
		getItem,
	};
}
