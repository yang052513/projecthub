import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import * as ROUTES from "../src/constants/routes"

import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Account from "./components/Account"

function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
      </div>
    </Router>
  )
}

export default App
