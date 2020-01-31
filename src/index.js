import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { Global, css } from "@emotion/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import pengTheme from "./theme";
import "./ii8n";
import { AppProvider } from "./authentication/AppProvider";
import { AppRouter } from "./authentication/AppRouter";

export const GlobalFonts = css`
  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-bold.woff") format("woff");
    font-weight: 800;
    font-style: bold;
    font-display: fallback;
  }
  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-book.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-bookItalic.woff") format("woff");
    font-weight: 500;
    font-style: italic;
    font-display: fallback;
  }

  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-medium.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-mediumItalic.woff") format("woff");
    font-weight: 700;
    font-style: italic;
    font-display: fallback;
  }
`;

const RootApp = props => {
  return (
    <ThemeProvider theme={pengTheme}>
      <CSSReset />
      <Global styles={GlobalFonts} />
      <AppRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </AppRouter>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<RootApp />, rootElement);
