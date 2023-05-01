import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AttributionIcon from '@mui/icons-material/Attribution';
/* toast */
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import MuiNavbar from "./components/Navbar/MuiNavbar";
import Router from "./routes/Router";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import ROUTES from "./routes/ROUTES";
import LoadingAnimationComponent from "./components/LoadingAnimationComponent";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const handleToAboutClick = () => {
    navigate(ROUTES.ABOUT);
  }
  const handleToFavsClick = () => {
    navigate(ROUTES.MYFAVS);
  }
  const handleToMyCardsClick = () => {
    navigate(ROUTES.MYCARDS);
  }
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header>
          <MuiNavbar />
        </header>
        <main>{isLoading ? <LoadingAnimationComponent /> : <Router />}</main>
        <footer>
          <Box>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={handleToAboutClick}/>
              {payload && !payload.isAdmin && !payload.biz && <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={handleToFavsClick}/>}
              {payload && (payload.isAdmin || payload.biz) && <BottomNavigationAction label="My Cards" icon={<AttributionIcon />} onClick={handleToMyCardsClick}/>}
            </BottomNavigation>
          </Box>
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
