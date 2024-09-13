import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button";
import { Feedback, Form, Input, InputContainer } from "./style";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "../../validator/zod/loginSchema";
import { useLogin } from "../../hooks/useLogin";

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { login } = useLogin();

  return (
    <Form onSubmit={handleSubmit(login)}>
      <InputContainer>
        <label>Email</label>
        <Input {...register("email")} placeholder="Informe seu email" type="email" />
        <Feedback>{errors?.email?.message}</Feedback>
      </InputContainer>
      <InputContainer>
        <label>Senha</label>
        <Input {...register("password")} placeholder="Informe sua senha" type="password" />
        <Feedback>{errors?.password?.message}</Feedback>
      </InputContainer>
      <Button type='submit'>Login</Button>
    </Form>
  )
}