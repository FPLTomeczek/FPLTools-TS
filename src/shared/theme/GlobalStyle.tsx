import { createGlobalStyle } from "styled-components";
import { Theme } from "./ThemeProvider";

const GlobalStyle = createGlobalStyle<{
  theme: Theme;
}>`
  *, *::before, *::after {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

    body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text}
  }
  input, select{
        background: ${(props) => props.theme.colors.input.background};
  }
`;

export default GlobalStyle;
