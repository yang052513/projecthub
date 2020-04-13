import React, { Component } from "react"
import firebase from "firebase"
import Status from "./Status"

class Collection extends Component {
  constructor() {
    super()
    this.state = {
      profile: "",
      total: 0,
      completed: 0,
      outschedule: 0,
      inprogress: 0,
      planning: 0,
      dropped: 0,
    }
  }

  componentDidMount() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("user")
        .doc(user.uid)
        .collection("Projects")
        .where("Schedule", "==", "In progress")
        .get()
        .then((querySnapshot) => {
          const inprogress = querySnapshot.docs.map((doc) => doc.data())
          this.setState({
            total: inprogress.length,
            inprogress: inprogress.length,
          })
        })
    })
  }
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
        <Status
          total={this.state.total}
          completed={this.state.completed}
          outschedule={this.state.outschedule}
          inprogress={this.state.inprogress}
          planning={this.state.planning}
          dropped={this.state.dropped}
        />
      </div>
    )
  }
}

export default Collection
