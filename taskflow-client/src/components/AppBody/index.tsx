import { PropsWithChildren } from "react";
import { Container } from "./style";

export function AppBody({ children }: Readonly<PropsWithChildren>) {
  return (
    <Container>
      {children}
    </Container>
  )
}