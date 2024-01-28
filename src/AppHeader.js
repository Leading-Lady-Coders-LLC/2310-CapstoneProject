import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';;
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const AppHeader = ({ isLoggedIn, logout ,cartCount}) => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "8rem" }}>
      <Toolbar>
      <Button sx={{ display: 'flex', flexDirection: 'column' }}>       
        <Box
          // className='imageButton'
          onClick={() => { navigate("/") }} 
          component="img"
          sx={{
              height: "7.5rem"
          }}
          alt="graphic of a cake"
          src="/public/assets/cake-icon-home.png"
          >
        </Box>
      </Button>

        <Tooltip title="Home">
          <IconButton
            color="inherit"
            aria-label="go home"
            onClick={() => { navigate("/") }}
            sx={{
              marginRight: '36px',
            }}
          >
            <HomeIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontSize: "5rem", mb: -1.5 }}
            align='center'
          >
            {`The Cake {Code}`}
          </Typography>
          <Typography variant='subtitle1' marginLeft='61%' sx={{ fontSize: "2rem", mt: -1.5 }}>take a byte</Typography>
        </Box>
        {isLoggedIn && (
          <>
           {/* display user profile */}
            <Tooltip title={"User profile"}>
              <IconButton
                color="inherit"
                aria-label={"user profile"}
                onClick={() => navigate("/user-profile_mui")}
              >
                <AccountCircleIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            {/* display cart */}
            <Tooltip title="Cart">
          <IconButton color="inherit" onClick={()=>{navigate("/cart")}}>
          <Badge badgeContent={cartCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "accent.dark" } }}>
            <ShoppingCartIcon fontSize='large' />
          </Badge>  
        </IconButton>
      </Tooltip>
          </>
        )}
        <Tooltip title={isLoggedIn ? "Logout" : "Login"}>
          <IconButton
            color="inherit"
            aria-label={isLoggedIn ? "Logout" : "Login"}
            onClick={() => isLoggedIn ? logout() : navigate("/sign-in")}
          >
            {isLoggedIn ? <LogoutIcon fontSize='large' /> : <LoginIcon fontSize='large' />}
          </IconButton>
        </Tooltip>  

      <IconButton color="inherit">
        <InfoIcon fontSize='large' />
      </IconButton>
    </Toolbar>
        </AppBar >
  )
}

export default AppHeader;
