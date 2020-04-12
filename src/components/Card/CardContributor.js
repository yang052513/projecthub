import React from "react"

function CardContributor(props) {
  const contributor = props.item.map((item) => (
    <img src={item} alt="contributor-pic" />
  ))
  return <div className="contributor-container">{contributor}</div>
}

export default CardContributor
