import React from "react"

function CardLang(props) {
  const category = props.item.map((item) => <li style={props.style}>{item}</li>)

  return (
    <div className="technology-container">
      <ul>{category}</ul>
    </div>
  )
}

export default CardLang
