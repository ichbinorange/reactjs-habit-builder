import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { getCurrentUser } from './components/util/ApiUtils';
import { ACCESS_TOKEN } from './components/util/BaseUrl';
// import Alert from 'react-s-alert';

import AppHeader from './components/common/AppHeader';
import NotFound from './components/common/NotFound';
import LoadingIndicator from './components/common/LoadingIndicator';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './Home';
import Login from './components/enjoyer/oauth/Login';
import Signup from './components/enjoyer/oauth/Signup';
import Profile from './components/enjoyer/oauth/Profile';
import OAuth2RedirectHandler from './components/enjoyer/oauth/OAuth2RedirectHandler';
import './App.css';

const App: React.FC = (props) => {
  const [authenticated, setAuthenticated] = useState<string | boolean>(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Event handler
  const onLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    // Alert.success("You're safely logged out!");
  }

  useEffect(() => {
    setLoading(true)
    getCurrentUser()
    .then(response => {
      setCurrentUser(response);
      setAuthenticated(true);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });    
  }, []);

  return (
    <div className="app">
      {loading ? <LoadingIndicator /> : null }
      <div className="app-top-box">
        <AppHeader authenticated={ authenticated } 
                   onLogout={ onLogout } />
      </div>
      <div className="app-body">
        <Switch>
          <Route exact path="/" component = { Home }></Route>           
          <PrivateRoute path="/profile" 
                        authenticated={ authenticated } 
                        currentUser={ currentUser }
                        component={ Profile }>
          </PrivateRoute>
          <Route path="/login"
            render={ (props) => <Login authenticated={ authenticated } {...props} /> }></Route>
          <Route path="/signup"
            render={ (props) => <Signup authenticated={ authenticated } {...props} /> }></Route>
          <Route path="/oauth2/redirect" 
                  component={ OAuth2RedirectHandler }></Route>  
          <Route component={ NotFound }></Route>
        </Switch>
      </div>
      {/* <Alert stack={{limit: 3}} 
        timeout = {3000}
        position='top-right' effect='slide' offset={65} /> */}
    </div>
  );
}

export default App;