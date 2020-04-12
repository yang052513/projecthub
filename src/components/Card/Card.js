import React from "react"

function Card() {
  return (
    <div className="card-container">
      <h4>Video Campaign</h4>
      <p>
        animeKnow is a Web App that built with React.js framework utilized
        Bangumi API. Bangumi API has tons of subjects database which includes
        animation, music, books and others. Sometime you dont know what to
        watch? animeKnow helps you find the animation for you.
      </p>
      <div className="feature-container">
        <ul>
          <li>Real time updated animation list for that day</li>
          <li>
            Search over thirty thousand subjects of animation, manga, film,
            music and game
          </li>
          <li>
            Random recommendation feature that notify you the animatin with good
            rating
          </li>
          <li>Bookmark the subject to your account</li>
        </ul>
      </div>
      <div className="technology-container">
        <ul>
          <li>React</li>
          <li>MongoDB</li>
          <li>Express</li>
          <li>Node.js</li>
        </ul>
      </div>
      <div className="contributor-container">
        <img src="./images/user.jpg" />
        <img src="./images/user.jpg" />
        <img src="./images/user.jpg" />
      </div>
    </div>
  )
}

export default Card
