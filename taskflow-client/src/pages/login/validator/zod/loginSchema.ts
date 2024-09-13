import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string({
			message: "Informe o seu email",
		})
		.email({
			message: "Informe um email válido",
		}),
	password: z
		.string({
			message: "Informe a sua senha",
		})
		.min(5, {
			message: "A senha deve ter pelo menos 5 caracteres",
		}),
});

export type LoginSchema = z.infer<typeof loginSchema>;
