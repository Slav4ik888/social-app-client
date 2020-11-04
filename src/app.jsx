import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import store from './redux/store';
import {userActionType} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/user-actions';
// MUI Stuff
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
// Components
import Navbar from './components/navbar';
import AuthRoute from './utils/auth-route';
// Pages
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';

axios.defaults.baseURL =
  `https://europe-west1-socialapp-103bb.cloudfunctions.net/api`;

const theme = createMuiTheme(themeFile);

const token = localStorage.FBidToken;
if (token && !token.includes(`Bearer undefined`)) {
  console.log(`token: `, token);
  const decodedToken = jwtDecode(token);
  console.log(`decodedToken: `, decodedToken);
  if (decodedToken * 1000 < Date.now) {
    store.dispatch(logoutUser());
    window.location.href(`/login`);
  } else {
    store.dispatch({type: userActionType.SET_AUTHENTICATED});
    axios.defaults.headers.common[`Authorization`] = token;
    store.dispatch(getUserData());
  }
}

const App = () => {

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
            <AuthRoute
              exact
              path="/signup"
              component={Signup}
            />
            <AuthRoute
              exact
              path="/login"
              component={Login}
            />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
