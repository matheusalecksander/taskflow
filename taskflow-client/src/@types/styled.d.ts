import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        black: string;
      };
      background: {
        default: string;
        lighter: string;
        paper: string;
      };
      error: {
        main: string;
      };
      warning: {
        main: string;
      };
      info: {
        main: string;
      };
      success: {
        main: string;
      };
    };
    typography: {
      fontFamily: string;
      fontSize: number;
      fontLight: number;
      fontRegular: number;
      fontMedium: number;
      fontBold: number;
    };
    spacing: (factor: number) => string;
    radius: (factor: number) => string;
    breakpoints: {
      values: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }
}
