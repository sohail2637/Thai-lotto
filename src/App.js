import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import PlayList from "./components/PlayList/PlayList";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Store from "./redux/store";
import Login from "./components/Login/Login";
import SignupPage from './components/SignUp/Sigup';
import Notification from "./components/Notification/Notification";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <div className="App-container">
            <div className="section">
              <Home />

              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Main} />
              <Route path="/drawerdetail" component={Details} />
              <Route path="/stream" component={PlayList} />
              <Route path="/notification" component={Notification} />
              <Route path="/admin" component={Admin} />

              <Route exact path="/signup" component={SignupPage} />
              {/*
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Main} />
              <Route path="/drawerdetail" component={Details} />
              <Route path="/stream" component={PlayList} />
              <Route path="/admin" render={() => <Admin />} /> */}
            </div>
            <NavBar />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
