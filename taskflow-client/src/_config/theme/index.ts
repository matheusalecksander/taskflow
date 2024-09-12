export const theme = {
	colors: {
		text: {
			primary: "#FDFDFD",
			secondary: "#E0E0E0",
			disabled: "#777777",
      black: "#111111"
		},
		background: {
			default: "#222222",
      lighter: "#404040",
			paper: "#D0D0D0",
		},
		error: {
			main: "#f44336",
		},
		warning: {
			main: "#ff9800",
		},
		info: {
			main: "#2196f3",
		},
		success: {
			main: "#4caf50",
		},
	},
	typography: {
		fontFamily: "sans-serif",
		fontSize: 16,
		fontLight: 300,
		fontRegular: 400,
		fontMedium: 500,
		fontBold: 700,
	},
	spacing: (factor: number) => `${0.25 * factor}rem`,
	radius: (factor: number) => `${0.25 * factor}rem`,
	breakpoints: {
		values: {
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
};
