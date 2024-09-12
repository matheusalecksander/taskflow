import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./style";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function Button({ children, variant = 'primary', ...rest }: Readonly<Props>) {
  return (
    <StyledButton variant={variant} {...rest}>{children}</StyledButton>
  )
}