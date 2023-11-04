import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import Connect from "./components/Connect";
import "./styles.scss";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box mt={2}>
        <img
          src="/logo-medium.svg"
          style={{ height: "2.2em", marginLeft: "2em" }}
        />
        <Connect />
      </Box>
    </ThemeProvider>
  );
}

export default App;
