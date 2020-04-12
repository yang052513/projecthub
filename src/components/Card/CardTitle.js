import React from "react"

function CardTitle(props) {
  return (
    <div className="title-container">
      <img src="./images/web.png" />
      <h4>{props.title}</h4>
      <p>In progress</p>
    </div>
  )
}

export default CardTitle
