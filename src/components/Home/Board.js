import React, { Component } from "react"
import firebase from "firebase"

import Card from "../Card/Card"

class Board extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      schedule: "All projects",
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("user")
        .doc(user.uid)
        .collection("Projects")
        .get()
        .then((querySnapshot) => {
          const result = querySnapshot.docs.map((doc) => ({
            key: doc.id,
            value: doc.data(),
          }))
          this.setState({ data: result })
        })
    })
  }

  render() {
    const allproject = this.state.data.map((project) => (
      <Card key={project.key} cardId={project.key} card={project.value} />
    ))

    const inprogress = this.state.data.map((project) => {
      if (project.value.Schedule === "In progress") {
        return (
          <Card key={project.key} cardId={project.key} card={project.value} />
        )
      }
    })

    const completed = this.state.data.map((project) => {
      if (project.value.Schedule === "Completed") {
        return (
          <Card key={project.key} cardId={project.key} card={project.value} />
        )
      }
    })

    const planning = this.state.data.map((project) => {
      if (project.value.Schedule === "Planning") {
        return (
          <Card key={project.key} cardId={project.key} card={project.value} />
        )
      }
    })

    const dropped = this.state.data.map((project) => {
      if (project.value.Schedule === "Dropped") {
        return (
          <Card key={project.key} cardId={project.key} card={project.value} />
        )
      }
    })

    const outschedule = this.state.data.map((project) => {
      if (project.value.Schedule === "Out of schedule") {
        return (
          <Card key={project.key} cardId={project.key} card={project.value} />
        )
      }
    })

    return (
      <div>
        <div className="board-schedule">
          <h3 className="filter-title">{this.state.schedule}</h3>
          <select onChange={this.handleFilter} name="schedule">
            <option value="All projects">All projects</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
            <option value="Planning">Planning</option>
            <option value="Dropped">Dropped</option>
            <option value="Out of schedule">Out of schedule</option>
          </select>
        </div>
        <div className="board-container">
          {this.state.schedule === "All projects"
            ? allproject
            : this.state.schedule === "In progress"
            ? inprogress
            : this.state.schedule === "Completed"
            ? completed
            : this.state.schedule === "Planning"
            ? planning
            : this.state.schedule === "Dropped"
            ? dropped
            : this.state.schedule === "Out of schedule"
            ? outschedule
            : null}
        </div>
      </div>
    )
  }
}

export default Board
