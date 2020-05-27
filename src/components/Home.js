import React from 'react'
import firebase from 'firebase'
import Hitokoto from './Home/Hitokoto'
import Project from './Home/Project'

function Home() {
  return (
    <div className="home-container component-layout">
      <Hitokoto />
      <Project />
    </div>
  )
}

export default Home
