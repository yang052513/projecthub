import React from "react"

function CardDesc(props) {
  return (
    <div className="desc-container">
      <p className="desc-start-date">
        <i className="far fa-clock"></i>
        {props.time}
      </p>
      <div className="desc-wrap">
        <i style={props.style} className="fas fa-book"></i>
        {props.desc}
      </div>
    </div>
  )
}

export default CardDesc
