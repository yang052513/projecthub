import React from "react"
import firebase from "firebase"
import Board from "./Home/Board"
import Header from "./Home/Header"
import Information from "./Home/Information"

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <Board />
    </div>
    <Information />
  </div>
)

export default Home
