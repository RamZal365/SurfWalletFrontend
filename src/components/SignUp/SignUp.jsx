import React, {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {signup} from '../../services/api/login';
import {red} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      errorMessage: null,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
      }
    }
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event){
    var form = this.state.form;
    form[event.target.name] = event.target.value
    this.setState({form: form})
  }

  isValid(){
    const form = this.state.form
    for (var key in form){
      if (form[key].length === 0){
        return false
      }
    }
    if (form.password !== form.repeatPassword){
      return false
    }
    return true
  }

  async signup(username, password){
    try{
      var response = null
      response = await signup(username, password);
      if (response.status === 201){
        this.setState({token: response.data.token})
        sessionStorage.setItem('token', response.data.token)
      }
      else{
        console.error(response.message);
        var form = this.state.form;
        form.password = ''
        form.repeatPassword = ''
        this.setState({form: form})
        this.setState({errorMessage: response.message})
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  handleSubmit(event){
    event.preventDefault();
    this.signup(this.state.form)
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={this.state.form.firstName}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    onChange={this.onChange}
                    autoComplete="given-name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={this.state.form.lastName}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={this.onChange}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={this.state.form.email}
                    id="email"
                    label="Email"
                    name="email"
                    onChange={this.onChange}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={this.state.form.username}
                    id="username"
                    label="Username"
                    name="username"
                    onChange={this.onChange}
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={this.state.form.password !== this.state.form.repeatPassword}
                    value={this.state.form.password}
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={this.state.form.password !== this.state.form.repeatPassword}
                    value={this.state.form.repeatPassword}
                    id="repeatPassword"
                    label="Repeat Password"
                    name="repeatPassword"
                    type="password"
                    onChange={this.onChange}
                    autoComplete="repeat-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disabled = {!this.isValid()}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {this.state.errorMessage? (
                <Typography variant="body1" color={red[500]}>{this.state.errorMessage}</Typography>
              ) : (null)}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      { this.state.token ? (<Navigate to="/"/>) : (null) }
      </>
    );
  }
}

export default SignUp