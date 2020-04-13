import React from "react"

function CardDesc(props) {
  return (
    <div className="desc-container">
      <p className="desc-start-date">
        <i class="far fa-clock"></i>
        {props.time}
      </p>
      <p>{props.desc}</p>
    </div>
  )
}

export default CardDesc
