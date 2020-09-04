import React from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import ChatRoom from './Components/ChatRoom'





/*
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Mars from './Components/Mars'
import Register from './Components/Register'
import Login from './Components/Login'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ='/' component={ Mars } />
        <Route exact path = '/login' component = { Login } />
        <Route exact path = '/register' component = { Register } />
      </Switch>
    </Router>
  );
}

export default App
