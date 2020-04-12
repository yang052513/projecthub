import React, { Component } from "react"
// import FormTitle from "../Form/FormTitle"
// import FormDesc from "../Form/FormDesc"
// import FormSubmit from "../Form/FormSubmit"
// import FormRepo from "../Form/FormRepo"
// import FormContributor from "../Form/FormContributor"
// import FormCategory from "../Form/FormCategory"
// import FormLang from "../Form/FormLang"

import firebase from "firebase"

class ProjectForm extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      description: "",
      category: "Web App",
      repo: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.addDoc = this.addDoc.bind(this)
  }

  handleChange(event) {
    const { name, value, type } = event.target
    this.setState({
      [name]: value,
    })
  }

  addDoc() {
    const db = firebase.firestore()
    const projectData = {
      Name: this.state.name,
      Description: this.state.description,
      Category: this.state.category,
      Repo: this.state.repo,
    }

    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("Projects")
        .add(projectData)
    })
  }

  render() {
    if (this.props.show) {
      return (
        <div className="project-input-modal">
          <div className="project-input-modal-content">
            <a onClick={this.props.toggle}>
              <i className="fas fa-chevron-left"></i>
            </a>

            <p>Project Name</p>
            <input
              name="name"
              onChange={this.handleChange}
              type="text"
              placeholder="What do you want to call?"
            />

            <p>Description</p>
            <input
              name="description"
              onChange={this.handleChange}
              type="text"
              placeholder="Project description(optional)"
            />

            <p>Category</p>
            <select name="category" onChange={this.handleChange}>
              <option value="Web App">Web App</option>
              <option value="Software Development">Software Development</option>
              <option value="IOS Development">IOS Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Game Development">Game Development</option>
            </select>

            <p>Repository Link</p>
            <input
              name="repo"
              onChange={this.handleChange}
              type="text"
              placeholder="Type your github repo link here"
            />

            <button onClick={this.addDoc}>Submit</button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default ProjectForm
