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
    //   db.collection("user").doc(user.uid).update({
    //     "BalanceStore": parseInt(newBalance)
    // })
  }

  render() {
    return (
      <div>
        <div className="card-container">
          <CardTitle
            type={this.state.category}
            title={this.state.title}
            schedule={this.state.schedule}
          />
          <CardDesc desc={this.state.desc} time={this.state.time} />
          <CardRepo link={this.state.link} />
          <CardLang item={this.state.lang} />
          <CardContributor item={this.state.contributor} />
          <button onClick={this.handleChange}>
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
                placeholder="What do you want to call?"
              />
              <button onClick={this.editChange}>Submit</button>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Card
