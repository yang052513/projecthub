import React from "react"

function CardTitle(props) {
  let type
  switch (props.type) {
    case "Web App":
      type = "./images/web.png"
      break
    case "Software Development":
      type = "./images/desktop.png"
      break
    case "IOS Development":
      type = "./images/smartphone.png"
      break
    case "Android Development":
      type = "./images/smartphone.png"
      break
    case "Game Development":
      type = "./images/game.png"
      break
  }

  return (
    <div className="title-container">
      <img src={type} />
      <h4>{props.title}</h4>
      <p>{props.schedule}</p>
    </div>
  )
}

export default CardTitle
