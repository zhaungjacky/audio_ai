import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import BottomZone from "../pages/BottomZone";
import LoginPage from "../pages/LoginPage";
type ThemeMode = "dark" | "light";

const NavRouter = () => {
  const [mode, setMode] = useState<ThemeMode>(() =>
    localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode")!)
      : "light"
  );

  const myTheme = createTheme({
    palette: {
      mode: mode,
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/">
              <Route index element={<MainPage />} />
            </Route>
            <Route path="/login">
              <Route index element={<LoginPage />} />
            </Route>
          </Routes>
          <BottomZone mode={mode} setMode={setMode} />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

export default NavRouter;
