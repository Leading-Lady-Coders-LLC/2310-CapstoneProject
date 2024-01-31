import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNavigate } from 'react-router-dom';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';



const AppHeader = ({ isLoggedIn, logout ,cartCount,}) => {
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
            src="/public/assets/cake-icon-home2.png"
            >
          </Box>
        </Button>
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
          <Badge badgeContent={cartCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "accentPurple.dark" } }}>
            <ShoppingCartIcon fontSize='large' />
          </Badge>  
        </IconButton>
      </Tooltip>
         
{/* display Contact */}
          <Tooltip title={"ContactMe"}>
              <IconButton
                color="inherit"
                aria-label={"Contact Me"}
                onClick={() => navigate("/contact")}
              >
                <ContactPhoneIcon fontSize='large' />
              </IconButton>
            </Tooltip>

 </>
        )}
     

          

        {/* display About Me */}
         <Tooltip title={"AboutMe"}>
              <IconButton
                color="inherit"
                aria-label={"About Me"}
                onClick={() => navigate("/aboutme")}
              >
                <InfoRoundedIcon fontSize='large' />
              </IconButton>
            </Tooltip>

        <Tooltip title={isLoggedIn ? "Logout" : "Login"}>
          <IconButton
            color="inherit"
            aria-label={isLoggedIn ? "Logout" : "Login"}
            onClick={() => isLoggedIn ? logout() : navigate("/sign-in")}
          >
            {isLoggedIn ? <LogoutIcon fontSize='large' /> : <LoginIcon fontSize='large' />}
          </IconButton>
        </Tooltip>  

    </Toolbar>
    </AppBar >
  )
}

export default AppHeader;
