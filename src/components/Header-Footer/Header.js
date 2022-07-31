import Logo from "../../assets/images/shop.jpg"
import ModalLogIn from "../content/ModalLogIn";


import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { Container, Grid, Typography, Button, Badge, Link } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AdbIcon from '@mui/icons-material/Adb';



import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


import { useEffect, useState } from "react";

import { auth, googleProvider } from "../../firebase";

import { useDispatch, useSelector } from "react-redux"

function Header() {
  const { user } = useSelector((reduxData) => reduxData.taskReducer);
  const { cart } = useSelector((reduxData) => reduxData.cartReducer);

  const dispatch = useDispatch();



  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //MODAL LOGIN
  const [openModalLogIn, setOpenModalLogIn] = useState(false);

  // LOGIN GOOGLE
  // const [user, setUser] = useState(null);

  const loginGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: "USER",
          user: result.user
        })
        // setUser(result.user);
        setOpenModalLogIn(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const logoutGoogle = () => {
    auth.signOut()
      .then(() => {
        dispatch({
          type: "USER",
          user: null
        })
        // setUser(null);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged((result) => {
      console.log(result);
      dispatch({
        type: "USER",
        user: result
      })
      // setUser(result)
    });
  }, []);


  //MODAL
  const logIn = () => {
    setOpenModalLogIn(true);
  }

  const handleCloseModal = () => {
    setOpenModalLogIn(false);
  }


  //NAVBAR
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container >
      <AppBar position="fixed" style={{ backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                // mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',

              }}
            >
              <img src={Logo} width="60px" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}

              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <Link href="/">
                    <Button><HomeIcon sx={{ fontSize: 30,}} /></Button>
                  </Link>

                  <Link href="/products">
                    <Button><FormatListBulletedIcon sx={{ fontSize: 30, }} /></Button>
                  </Link>

                  <Link href="/cart">
                    <Badge color="error" badgeContent={cart}>
                      <Button><ShoppingCartIcon sx={{ fontSize: 30,  }} /></Button>
                    </Badge>
                  </Link>

                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                // mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 5,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={Logo} width="200" />
            </Typography>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} style={{ marginRight: "80px" }}>
              <Container
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href="/">
                  <Button><HomeIcon sx={{ fontSize: 30, color: "black" }} /></Button>
                </Link>

                <Link href="/products">
                  <Button><FormatListBulletedIcon sx={{ fontSize: 30, color: "black" }} /></Button>
                </Link>

                <Link href="/cart">
                  <Badge color="error" badgeContent={cart}>
                    <Button><ShoppingCartIcon sx={{ fontSize: 30, color: "black" }} /></Button>
                  </Badge>
                </Link>
              </Container>
            </Box>
            {
              user ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography variant="body1">{user.displayName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography variant="body1" onClick={logoutGoogle} color="primary"><b><LogoutIcon /> Logout</b></Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                :
                <Box sx={{ flexGrow: 0 }}>
                  <Typography variant="body1" onClick={logIn} style={{ cursor: "pointer", color: "black" }}>
                    <b className="text-login"><LoginIcon /> Login</b>
                  </Typography>

                  {/* <Link href="/login" style={{ cursor: "pointer", color: "black", textDecoration: "none" }}>
                    <b className="text-login"><LoginIcon /> Login</b>
                  </Link> */}
                </Box>
            }

          </Toolbar>
        </Container>
      </AppBar >


      {/* Modal LogIn */}
      < ModalLogIn openModalLogIn={openModalLogIn} handleCloseModal={handleCloseModal} loginGoogle={loginGoogle} />

    </Container >
  );
}

export default Header;