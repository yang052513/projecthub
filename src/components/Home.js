import React from "react"
import firebase from "firebase"
function Home() {
  return (
    <div>
      <p>主界面</p>
      <button onClick={() => firebase.auth().signOut()}>退出</button>
    </div>
  )
}

export default Home
