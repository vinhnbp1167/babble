import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import { createBrowserHistory } from 'history';

import { Chats, Auth, Room } from './components';

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider> 
          <Switch>
            <Route path="/chats" exact component={Chats} /> 
            <Route path="/room/:roomID" component={Room} />
            <Route path="/" component={Auth} /> 
          </Switch>
        </AuthProvider> 
      </Router>
    </div>
  )
}

export default App
