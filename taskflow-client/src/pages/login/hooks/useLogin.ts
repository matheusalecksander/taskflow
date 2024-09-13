/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { LoginSchema } from "../validator/zod/loginSchema";
import { api } from "../../../_api";
import { setItem } from "../../../utils/localStorage";

export function useLogin() {
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
		[]
	);

	return {
		login,
	};
}
