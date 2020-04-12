import React, { Component } from "react"
import ProjectForm from "./ProjectForm"

class NewProjectBtn extends Component {
  constructor() {
    super()
    this.state = {
      showComponent: false,
    }
    this.createProject = this.createProject.bind(this)
  }
  createProject() {
    this.setState((prevState) => {
      return {
        showComponent: !prevState.showComponent,
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.createProject}>Create a new project</button>
        {this.state.showComponent ? (
          <ProjectForm
            toggle={this.createProject}
            show={this.state.showComponent}
          />
        ) : null}
      </div>
    )
  }
}

export default NewProjectBtn
