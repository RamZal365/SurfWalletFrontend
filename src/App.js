import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { logout } from './services/api/login';
import PrivateRoute from './components/Custom/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Surfboard from './components/Surfboards/Surfboard';
import Surfboards from './components/Surfboards/Surfboards';
import Wetsuit from './components/Wetsuits/Wetsuit';
import Wetsuits from './components/Wetsuits/Wetsuits';
import Spot from './components/Spots/Spot';
import Spots from './components/Spots/Spots';
import { Component } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      userToken: sessionStorage.getItem('token'),
      loggedOut: false
    }
    this.logOut = this.logOut.bind(this);
  }

  async logOut(){
    try{
      const response = await logout(this.state.userToken);
      if (response.status == 200){
        sessionStorage.removeItem('token')
        this.setState({ loggedOut: true}); // Update the state with surfboard data
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  render(){
  return (
    <>
    <div className="container">
      <AppBar position="fixed" color="primary">
        <Toolbar>
        <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Surf Wallet
          </Typography>
          <Button onClick={this.logOut} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}> </Route>
          <Route path='/login' element={<Login></Login>}> </Route>
          <Route path='/signup' element={<SignUp></SignUp>}> </Route>
          
          {/*Surfboards */}
          <Route path='/surfboard/:id?' element={
            <PrivateRoute authed={this.state.userToken} path='/surfboard/:id?' component={Surfboard} />
            }>
          </Route>
          <Route path='/surfboards' element={
            <PrivateRoute authed={this.state.userToken} path='/surfboards' component={Surfboards} />
            }>
          </Route>

          {/*Wetsuits */}
          <Route path='/wetsuit/:id?' element={
            <PrivateRoute authed={this.state.userToken} path='/wetsuit/:id?' component={Wetsuit} />
            }>
          </Route>
          <Route path='/wetsuits' element={
            <PrivateRoute authed={this.state.userToken} path='/wetsuits' component={Wetsuits} />
            }>
          </Route>

          {/*Spots */}
          <Route path='/spot/:id?' element={
            <PrivateRoute authed={this.state.userToken} path='/spot/:id?' component={Spot} />
            }>
          </Route>
          <Route path='/spots' element={
            <PrivateRoute authed={this.state.userToken} path='/spots' component={Spots} />
            }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}
}

export default App;
