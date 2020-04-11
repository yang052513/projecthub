import React, { Component } from "react"
import firebase from "firebase"
import Status from "./Status"

class Collection extends Component {
  render() {
    return (
      <div className="collection-container">
        <p className="greeting">
          Hello,
          <span className="user-name">
            {firebase.auth().currentUser.displayName}
          </span>
        </p>
        <img
          className="user-profile"
          src="./images/user.jpg"
          alt="user-profile"
        />
        <Status />
      </div>
    )
  }
}

export default Collection
