import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: ${({ theme }) => theme.colors.background.default};
	color: ${({ theme }) => theme.colors.text.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 ${({ theme }) => theme.spacing(32)}
`;
