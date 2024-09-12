import styled from "styled-components";

export const Container = styled.div`
	padding: 1rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LogoTitle = styled.h1`
	color: ${({ theme }) => theme.colors.text.black};
  display: flex;
`;

export const LogoSpan = styled.div`
	color: ${({ theme }) => theme.colors.text.primary};
`;
