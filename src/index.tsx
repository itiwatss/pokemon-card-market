import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";

// Apply font in MUI
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Poppins",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
