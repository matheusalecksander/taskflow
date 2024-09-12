import { Logo } from "../../components/Logo";
import { LoginForm } from "./containers/LoginForm";
import { Container, LoginBox } from "./style";

export function Login() {
  return (
    <Container>
      <LoginBox>
        <Logo />
        <LoginForm />
      </LoginBox>
    </Container>
  )
}