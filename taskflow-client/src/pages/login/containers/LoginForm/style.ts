import styled from "styled-components";

export const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing(8)};
	padding: ${({ theme }) => theme.spacing(4)} 0;
	width: 100%;
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing(2)};
	width: 100%;
`;

export const Input = styled.input`
	padding: ${({ theme }) => theme.spacing(2)};
	height: 2rem;
`;

export const Feedback = styled.span`
	color: ${({ theme }) => theme.colors.error.main};
`