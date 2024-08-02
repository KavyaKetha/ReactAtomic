import { ThemeProvider } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import theme from "../src/themes/theme";
import "../src/App.css";

/* snipped for brevity */

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      dark: theme,
    },
    defaultTheme: "dark",
    Provider: ThemeProvider,
  }),
];
