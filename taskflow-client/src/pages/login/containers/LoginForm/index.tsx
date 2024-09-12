import { Button } from "../../../../components/Button";
import { Form, Input, InputContainer } from "./style";

export function LoginForm() {
  return (
    <Form>
      <InputContainer>
        <label>Email</label>
        <Input placeholder="Informe seu email" type="email" required />
      </InputContainer>
      <InputContainer>
        <label>Senha</label>
        <Input placeholder="Informe sua senha" type="password" required />
      </InputContainer>
      <Button type='submit'>Login</Button>
    </Form>
  )
}