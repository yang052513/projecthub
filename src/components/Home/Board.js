import React, { Component } from "react"
import firebase from "firebase"

import Card from "../Card/Card"

class Board extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("user")
        .doc(user.uid)
        .collection("Projects")
        .get()
        .then((querySnapshot) => {
          const result = querySnapshot.docs.map((doc) => doc.data())
          this.setState({ data: result })
        })
    })
  }

  render() {
    console.log(this.state.data)
    const cardComponent = this.state.data.map((item) => <Card card={item} />)
    return (
      <div>
        <h3 className="filter-title">All Project</h3>
        <div className="board-container">{cardComponent}</div>
      </div>
    )
  }
}

export default Board
