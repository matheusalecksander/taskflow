import styled from "styled-components";

interface ButtonProps {
	variant: "primary" | "secondary";
}

export const StyledButton = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontBold};

  &:hover {
    cursor: pointer;
  }
`;
