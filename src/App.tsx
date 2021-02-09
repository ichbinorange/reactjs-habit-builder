import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
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
import Home from './components/common/Home';
import Login from './components/enjoyer/oauth/Login';
import Signup from './components/enjoyer/oauth/Signup';
import Profile from './components/enjoyer/oauth/Profile';
import OAuth2RedirectHandler from './components/enjoyer/oauth/OAuth2RedirectHandler';
import Habit from './components/habit/Habit';
import HabitTracker from './components/habitTracker/HabitTracker';
import Friendship from './components/friendship/Friendship';
import './App.css';

const App: React.FC = (props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Event handler
  const onLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    // Alert.success("You're safely logged out!");
  }

  const loadCurrentlyLoggedInUser = () => {
    setLoading(true)
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });   
  }

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  return (
    <Router>
      {loading ? <LoadingIndicator /> : null }
      <div>
        <div className="app-top-box">
          <AppHeader authenticated={ authenticated } 
                     onLogout={ onLogout } />
        </div>
        <div>
          <Switch>
            <Route exact path="/" component = { Home }></Route>           
            <PrivateRoute path="/profile" 
                          authenticated={ authenticated } 
                          currentUser={ currentUser }
                          component={ Profile }>
            </PrivateRoute>
            <PrivateRoute path="/habit"
                          authenticated={ authenticated } 
                          component={ Habit }
                          currentUser={ currentUser }>
            </PrivateRoute>
            <PrivateRoute path="/habitTracker"
                          authenticated={ authenticated } 
                          component={ HabitTracker }
                          currentUser={ currentUser }>            
            </PrivateRoute>
            <PrivateRoute path="/friendship"
                          authenticated={ authenticated } 
                          component={ Friendship }
                          currentUser={ currentUser }>            
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
    </Router>
  );
}

export default App;