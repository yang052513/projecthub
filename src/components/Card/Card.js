import React from "react"
import CardTitle from "./CardTitle"
import CardDesc from "./CardDesc"
import CardFeature from "./CardFeature"
import CardLang from "./CardLang"
import CardContributor from "./CardContributor"

function Card() {
  return (
    <div className="card-container">
      <CardTitle title="AnimeKnow" />
      <CardDesc
        desc="animeKnow is a Web App that built with React.js framework utilized
        Bangumi API."
      />
      <CardFeature />
      <CardLang />
      <CardContributor />
    </div>
  )
}

export default Card
