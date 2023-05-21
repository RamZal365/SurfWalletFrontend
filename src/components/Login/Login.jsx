import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';
import {login} from '../../services/api/login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      errorMessage: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async login(username, password){
    try{
      var response = null
      response = await login(username, password);
      if (response.status === 200){
        this.setState({token: response.data.token})
      }
      else{
        console.error(response.data.message);
        this.setState({errorMessage: response.data.message})
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    this.login(data.get('username'), data.get('password'))
  };


  render(){
    const theme = createTheme({
      palette: {
        primary: {
          main: '#33C7FF',
        },
        secondary: {
          main: '#FE3800',
        },
      },
    });

    return (
      <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(https://media.istockphoto.com/id/858905606/es/vector/patr%C3%B3n-transparente-de-vector-con-surfistas-fondo-de-verano.jpg?s=612x612&w=0&k=20&c=q6IwITDaXMGalVYbylCL2qGhGbVYzyHr8KIL5uYpmmQ=)`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                {this.state.errorMessage? (
                  <TextField
                  error
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={this.state.errorMessage}
                />
                ) : (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                )}

                
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      { this.state.token ? (<Navigate to="/"/>) : (null) }
      </>
    )}
}
export default LogIn