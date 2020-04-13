import React from "react"
import CardTitle from "./CardTitle"
import CardDesc from "./CardDesc"
import CardRepo from "./CardRepo"
import CardLang from "./CardLang"
import CardContributor from "./CardContributor"

function Card(props) {
  return (
    <div className="card-container">
      <CardTitle
        type={props.card.Category}
        title={props.card.Name}
        schedule={props.card.Schedule}
      />
      <CardDesc desc={props.card.Description} time={props.card.Time} />
      <CardRepo link={props.card.Repo} />
      <CardLang item={props.card.Language} />
      <CardContributor
        item={["images/user-4.jpg", "images/user-2.jpg", "images/user-3.jpg"]}
      />
    </div>
  )
}

export default Card
