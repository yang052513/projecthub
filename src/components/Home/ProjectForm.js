import React, { Component } from "react"
import FormTitle from "../Form/FormTitle"
import FormDesc from "../Form/FormDesc"
import FormSubmit from "../Form/FormSubmit"
import FormRepo from "../Form/FormRepo"
import FormContributor from "../Form/FormContributor"
import FormCategory from "../Form/FormCategory"
import FormLang from "../Form/FormLang"

function ProjectForm(props) {
  if (props.show) {
    return (
      <div className="project-input-modal">
        <div className="project-input-modal-content">
          <button onClick={props.toggle}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h4 className="create-project-tit">CREATE A NEW PROJECT</h4>
          <FormTitle />
          <FormDesc />
          <FormCategory />
          <FormRepo />
          <FormLang />
          <FormContributor />
          <FormSubmit />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ProjectForm
