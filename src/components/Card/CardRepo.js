import React from "react"

function CardRepo(props) {
  return (
    <p className="repo-container">
      <i style={props.style} class="fab fa-github"></i>
      {props.link}
    </p>
  )
}

export default CardRepo
