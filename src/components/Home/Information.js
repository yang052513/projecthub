import React, { Component } from "react"
import Collection from "./Collection"
import Activity from "./Activity"

class Information extends Component {
  render() {
    return (
      <div className="information-container">
        <Collection />
        <Activity />
      </div>
    )
  }
}

export default Information
