import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import palette from "./palette";

const theme = createTheme({
  palette,
  typography: {
    h1: {
      fontSize: "3.75rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#6E6E6E",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: palette.secondary.main,
          color: palette.secondary.contrastText,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: palette.secondary.contrastText,
          "&.Mui-selected": {
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.secondary.contrastText,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
});

export default theme;
