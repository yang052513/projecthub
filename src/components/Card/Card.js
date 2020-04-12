import React from "react"
import CardTitle from "./CardTitle"
import CardDesc from "./CardDesc"
import CardRepo from "./CardRepo"
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
      <CardRepo link="https://github.com/yang052513/bcitcst" />
      <CardLang item={["React", "MongoDB", "Express", "Node.js", "Ajax"]} />
      <CardContributor item={["./images/user.jpg", "./images/user.jpg"]} />
    </div>
  )
}

export default Card
