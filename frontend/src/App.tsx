import React from "react";
import "./App.css";
import MainApp from "./Routes/MainApp";
import { CssBaseline } from "@mui/material";
// for cookies::
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {

  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <MainApp />
        
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
