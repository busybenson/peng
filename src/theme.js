import { theme as ChakraTheme } from "@chakra-ui/core";
import pengIcons from "./icons";
const pengTheme = {
  ...ChakraTheme,
  fonts: {
    ...ChakraTheme.fonts,
    heading: "Circular, Helvetica, sans-serif",
    body: "Circular, Helvetica, sans-serif"
  },
  colors: {
    ...ChakraTheme.colors,
    pink: {
      50: "#FEE9F7",
      100: "#FCBEE7",
      200: "#FA92D7",
      300: "#F867C7",
      400: "#F63CB7",
      500: "#F411A8",
      600: "#C80EBA",
      700: "#9C0B68",
      800: "#6F084D"
    }
  },
  borderWidths: {
    xl: "2rem",
    lg: "1rem",
    md: "0.5rem",
    sm: "0.25rem",
    xs: "0.125rem",
    "2xs": "0.0625rem",
    "3xs": "0.03125rem",
    none: 0
  },
  radii: {
    ...ChakraTheme.radii,
    xl: "0.75rem"
  },
  icons: {
    ...ChakraTheme.icons,
    ...pengIcons
  }
};

export default pengTheme;
