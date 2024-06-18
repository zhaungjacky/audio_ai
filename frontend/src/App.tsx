import React from "react";
import "./App.css";
import NavRouter from "./router/NavRouter";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box className="App">
      <Box sx={{ minHeight: "100vh" }}>
        <NavRouter />
      </Box>
    </Box>
  );
}

export default App;
