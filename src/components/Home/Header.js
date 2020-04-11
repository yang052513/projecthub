import React, { Component } from "react"
import NewProjectBtn from "./NewProjectBtn"

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <h3>ProjectHub</h3>
        <NewProjectBtn />
      </div>
    )
  }
}

export default Header
