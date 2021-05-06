import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const theme = responsiveFontSizes(createMuiTheme({
    typography: {
        useNextVariants: true,
        h1: {
            fontSize: "3rem",
        },
        h2: {
            fontSize: "1.875rem",
        },
        h3: {
            fontSize: "1.5rem",
        },
        h4: {
            fontSize: "1.0625rem",
        },
        h5: {
            fontSize: ".75rem",
        },
        h6: {
            fontSize: ".625rem",
        },
    },
    palette: {
        primary: {
            main: "#1A8FE6",
            dark: "#176FB3"
        },
    },
}));
