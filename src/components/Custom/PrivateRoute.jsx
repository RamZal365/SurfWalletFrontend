import { Route, Navigate } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, authed, ...rest }) {
    return !!authed
          ? <Component/>
          : <Navigate to={{pathname: '/login'}} />
  }
  
export default PrivateRoute