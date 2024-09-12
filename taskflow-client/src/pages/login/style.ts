import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LoginBox = styled.div`
	width: 35%;
	padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background.lighter};
  display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)}
`;
