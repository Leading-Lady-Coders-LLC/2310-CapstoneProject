import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, useNavigate, Route, Routes } from 'react-router-dom';
import api from './api';
import Home from './Home';
import SignIn from './SignIn';
import Products from './Products';
import SignUp from './SignUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Css } from '@mui/icons-material';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    //blue
    primary: {
      main: '#9ad8eb',
      light: '#bbe4f2',
      dark: '#66c4e1',
      contrastText: '#3d3d3d',
    },
    //cream
    secondary: {
      main: '#efe19f',
      light: '#f8f3dd',
      dark: '#eadb99',
    },
    //purple
    accentPurple: {
      dark: '#c999ff',
      main: '#d3adff',
      light: '#e9d6ff',
    },
    //pink
    accentPink: {
      dark: '#FE86AE',
      main: '#FEA0C0',
      light: '#FEC2D6',
      darkest: '#fd5d93'
    },
    //yellow
    accentYellow: {
      main: 'eeee73',
    },
    //very light cream
    background: {
      default: '#f3eedc',
    },
    text: {
      primary: 'rgba(20,20,20,1)',
      secondary: 'rgba(40,40,42,0.7)',
    },
  },
  typography: {
    fontWeightLight: 200,
    fontFamily: 'Arial',
    h1: {
      fontFamily: 'Courier',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Courier',
      fontWeight: 800,
    },
    h3: {
      fontFamily: 'Courier',
      fontWeight: 800,
    },
    h4: {
      fontFamily: 'Courier',
      fontWeight: 800,
    },
    h5: {
      fontFamily: 'Courier',
      fontWeight: 800,
    },
    h6: {
      fontFamily: 'Courier',
      fontWeight: 800,
    },
    body1: {
      fontWeight: 550
    },
    body2: {
      fontWeight: 500
    }
  },
});

const App = () => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
    navigate("/");
  };

  const logout = () => {
    api.logout(setAuth);
    navigate("/");
   }; 

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<Home user={auth} logout={logout} setUser={setAuth} />} />
        <Route path="/sign-in" element={<SignIn login={login} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);