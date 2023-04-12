import './App.css';

import { createTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import {red} from '@mui/material/colors';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';

import ApiContextProvider from "./context/ApiContext";
import Main from "./components/Main";

const theme=createTheme({
  palette :{
    primary: lightBlue,
    secondary: red,
  },
  typography:{
    //App.css内でgooglefontから＠importしてCSS rules to specify familiesの記述をここに書く
    fontFamily: "'M PLUS 1p', sans-serif",
  },
});


function App() {
  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Main />
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
