import React from "react"
import { Link } from "react-router-dom"
import * as ROUTES from "../constants/routes"
import firebase from "firebase"

const Navigation = () => (
  <div className="side-navbar">
    <img className="logo" src="./images/logo.png" />
    <div className="side-navbar-icon">
      <Link to={ROUTES.HOME}>
        <img src="./images/board.png" />
      </Link>

      <Link to={ROUTES.ACCOUNT}>
        <img src="./images/user.jpg" />
      </Link>
      <Link to={ROUTES.ACCOUNT}>
        <img src="./images/info.png" />
      </Link>
      <a onClick={() => firebase.auth().signOut()}>
        <img src="./images/logout.png" />
      </a>
    </div>
  </div>
)

export default Navigation
