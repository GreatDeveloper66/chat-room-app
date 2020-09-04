import React from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import ChatRoom from './Components/ChatRoom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = '/register' component = {Register} />
        <Route exact path = '/' component = {Login} />
        <Route exact path = '/ChatRoom' component = {ChatRoom} />
      </Switch>
    </Router>

  )
}



