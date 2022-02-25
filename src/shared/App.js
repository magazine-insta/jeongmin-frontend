import './App.css';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import Header from '../components/Header';
import { PostList, Login, Signup, PostWrite, PostDetail } from '../pages';

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from './Cookie';


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (getCookie("token")) {
      dispatch(userActions.loginCheck());
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box>
          <Header></Header>
          <ConnectedRouter history={history}>
            <Route path="/" exact component={PostList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/write" exact component={PostWrite} />
            <Route path="/write/:id" exact component={PostWrite} />
            <Route path="/post/:id" exact component={PostDetail} />
          </ConnectedRouter>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;