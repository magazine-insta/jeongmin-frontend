import "./App.css";
import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { history } from "../redux/configureStore";
import { CookiesProvider } from "react-cookie";

import Header from "../components/Header";
import { PostList, Login, Signup, PostWrite, PostDetail } from "../pages";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "./Cookie";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    console.log("메인화면에서::::: ", token)
    if (token) {
      dispatch(userActions.loginCheck(token));
    }
  }, []);

  return (
    <CookiesProvider>
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
    </CookiesProvider>
  );
}

export default App;
