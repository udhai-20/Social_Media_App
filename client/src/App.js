import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import MainRouter from "./Router/MainRouter";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
