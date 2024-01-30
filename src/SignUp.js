import React, { useState } from "react";
import axios from "axios";
import { Avatar, Button, Container, CssBaseline, TextField, Link, Box, Grid, Typography } from '@mui/material'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3050/">
          Cake Bytes
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
 
  const SignUp = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
          firstname,
          lastname,
          username,
          password,
          is_admin: false,
          is_vip: false
        };
        try {
          const response = await axios.post(
            "/api/users/register",
            user
          );    
          navigate("/thankyou?sentFrom=SignUp");
        } catch (error) {
          setError(error.response.data.message);
        }
    };

    return (      
      <Box component='main' sx={{ height: '100vh', backgroundColor: 'white', display: 'flex'}} >
      <Container maxWidth='md' sx={{ flexGrow: 1 }}>
          
          <Box
              sx={{
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
          >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                          <TextField
                          autoComplete="none"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          inputProps={{ minLength: 3, maxLength: 12 }}
                          autoFocus
                          onChange={(e) => {setFirstname(e.target.value)}}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="none"
                          inputProps={{ minLength: 3, maxLength: 12 }}
                          onChange={(e) => {setLastname(e.target.value)}}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          required
                          fullWidth
                          id="email or username"
                          label="Email Address or Username"
                          name="email_username"
                          autoComplete="none"
                          inputProps={{ minLength: 6, maxLength: 25 }}
                          onChange={(e) => {setUsername(e.target.value)}}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="none"
                          inputProps={{ minLength: 6, maxLength: 25 }}
                          onChange={(e) => {setPassword(e.target.value)}}
                          />
                      </Grid>
                  </Grid>

                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                  >
                      Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                  <Grid item>
                      <Link href="/#/sign-in" variant="body2" sx={{ color: 'primary.dark'}} >
                      Already have an account? Sign in
                      </Link>
                  </Grid>
                  </Grid>
              </Box>
              {
                  error ? <p>{error}</p> : null
              }
          </Box>
          <Copyright sx={{ mt: 5 }} />
      </Container>
      <Box
        sx={{
          flexGrow: 2,
          backgroundImage: 'url(public/assets/login.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

      </Box>
      </Box>
    )

  }

  export default SignUp;