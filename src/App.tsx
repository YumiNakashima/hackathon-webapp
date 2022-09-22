import "./App.css"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import RegisterForm from "./modules/register/RegisterForm"
import React from "react"
import Success from "./modules/register/Success"

function App() {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Switch>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  )
}

export default App
