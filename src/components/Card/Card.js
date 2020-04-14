import React, { Component } from "react"
import firebase from "firebase"
import CardTitle from "./CardTitle"
import CardDesc from "./CardDesc"
import CardRepo from "./CardRepo"
import CardLang from "./CardLang"
import CardContributor from "./CardContributor"

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardId: props.cardId,
      edit: false,
      category: props.card.Category,
      title: props.card.Name,
      schedule: props.card.Schedule,
      desc: props.card.Description,
      time: props.card.Time,
      link: props.card.Repo,
      lang: props.card.Language,
      contributor: [
        "images/user-4.jpg",
        "images/user-2.jpg",
        "images/user-3.jpg",
      ],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.editChange = this.editChange.bind(this)
  }

  handleChange() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      }
    })
  }

  handleInput(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  editChange() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged((user) => {
      let ref = db
        .collection("user")
        .doc(user.uid)
        .collection("Projects")
        .doc(this.state.cardId)
      ref.update({
        Name: this.state.title,
        Description: this.state.desc,
        Schedule: this.state.schedule,
      })
    })
    this.setState({
      edit: false,
    })
  }

  render() {
    let cardBorder, textColor, tagColor
    switch (this.state.schedule) {
      case "Completed":
        cardBorder = { border: "1px solid #c72dbd", color: "#c72dbd" }
        textColor = { color: "#c72dbd" }
        tagColor = { backgroundColor: "#c72dbd" }
        break
      case "Planning":
        cardBorder = { border: "1px solid #2d91c7", color: "#2d91c7" }
        textColor = { color: "#2d91c7" }
        tagColor = { backgroundColor: "#2d91c7" }
        break
      case "Dropped":
        cardBorder = { border: "1px solid #9fa1a1", color: "#9fa1a1" }
        textColor = { color: "#9fa1a1" }
        tagColor = { backgroundColor: "#9fa1a1" }
        break
      case "Out of schedule":
        cardBorder = { border: "1px solid #c72d2d", color: "#c72d2d" }
        textColor = { color: "#c72d2d" }
        tagColor = { backgroundColor: "#c72d2d" }
        break
    }

    return (
      <div>
        <div style={cardBorder} className="card-container">
          <CardTitle
            type={this.state.category}
            title={this.state.title}
            schedule={this.state.schedule}
            style={textColor}
          />
          <CardDesc
            desc={this.state.desc}
            time={this.state.time}
            style={textColor}
          />
          <CardRepo style={textColor} link={this.state.link} />
          <CardLang style={tagColor} item={this.state.lang} />
          <CardContributor item={this.state.contributor} />
          <button style={cardBorder} onClick={this.handleChange}>
            <i className="fas fa-pen"></i>
          </button>
        </div>
        {this.state.edit ? (
          <div className="project-input-modal">
            <div className="project-input-modal-content">
              <p>Project Name</p>
              <input
                name="title"
                onChange={this.handleInput}
                type="text"
                placeholder={this.state.title}
              />
              <p>Description</p>
              <input
                name="desc"
                onChange={this.handleInput}
                type="text"
                placeholder={this.state.desc}
              />
              <p>Schedule</p>
              <select name="schedule" onChange={this.handleInput}>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
                <option value="Planning">Planning</option>
                <option value="Dropped">Dropped</option>
                <option value="Out of schedule">Out of schedule</option>
              </select>
              <div className="input-btn-wrap">
                <button onClick={this.editChange}>Save</button>
                <button onClick={this.handleChange}>Cancel</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Card
