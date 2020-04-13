import React, { Component } from "react"

import firebase from "firebase"

class ProjectForm extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      description: "",
      category: "Web App",
      repo: "",
      lang: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.addDoc = this.addDoc.bind(this)
    this.handleLang = this.handleLang.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  addDoc() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    const postDate = monthNames[month] + " " + day + ", " + year
    const db = firebase.firestore()
    const projectData = {
      Name: this.state.name,
      Description: this.state.description,
      Category: this.state.category,
      Repo: this.state.repo,
      Language: this.state.lang,
      Time: postDate,
      Schedule: "In progress",
    }

    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("Projects")
        .add(projectData)
    })
    // 关闭表单
    this.props.toggle()
  }

  handleLang() {
    let value = document.getElementById("lang-input").value
    this.setState((prevState) => {
      return {
        lang: [...prevState.lang, value],
      }
    })
    document.getElementById("lang-input").value = ""
  }

  render() {
    const langList = this.state.lang.map((item) => <li>{item}</li>)

    if (this.props.show) {
      return (
        <div className="project-input-modal">
          <div className="project-input-modal-content">
            <a onClick={this.props.toggle}>
              <i className="fas fa-chevron-left"></i>
            </a>
            <h4>CREATE A NEW PROJECT</h4>

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

            <div className="technology-container">
              <p>Technology / Tools</p>
              <input id="lang-input" name="lang" type="text" />
              <ul>{langList}</ul>
              <button onClick={this.handleLang}>Add</button>
            </div>

            <div className="submit-btn">
              <button onClick={this.addDoc}>Submit</button>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default ProjectForm
