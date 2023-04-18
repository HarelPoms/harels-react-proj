import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';

import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavbarMenuLinks from "./NavbarMenuLinks";

const MuiNavbar = () => {
  const navigate = useNavigate();
  const [isSearchUnfocused, setIsSearchUnfocused] = useState(true);
  const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoClick = () => {
    navigate(ROUTES.HOME);
  }

  const trackSearchUnfocused = () => {
    setIsSearchUnfocused(!isSearchUnfocused);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box onClick={logoClick} sx={{ display: { xs: "none", md: "inline" } }}>
            <CameraAltIcon />
          </Box>
          
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavbarMenuLinks />
          </Box>
          <SearchPartial handleSearchFocus={trackSearchUnfocused}/>
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              {isDarkTheme && isSearchUnfocused ? <DarkModeIcon onClick={changeTheme} /> :
              isSearchUnfocused ?
              <LightModeIcon onClick={changeTheme}/> : ""}
              {isLoggedIn && isSearchUnfocused ? <Avatar alt="profile pic" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" /> : ""}
            </Box>
            
          </Box>
          {/* hamburger with menu */}
          {isSearchUnfocused ? <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavbarMenuLinks />
            </Menu>
          </Box> : ""}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
