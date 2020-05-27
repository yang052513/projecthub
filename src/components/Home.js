import React from 'react'
import firebase from 'firebase'
import Hitokoto from './Home/Hitokoto'

function Home() {
  return (
    <div className="component-layout">
      <Hitokoto />
    </div>
  )
}

export default Home
