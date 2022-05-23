import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import { Chats, Auth } from './components';

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider> 
          <Switch>
            <Route path="/chats" component={Chats} /> 
            <Route path="/" component={Auth} /> 
          </Switch>
        </AuthProvider> 
      </Router>
    </div>
  )
}

export default App
