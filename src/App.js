import React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"

const config = {
  apiKey: "AIzaSyADkkb297MIxw6TMNeodIEIJQQC86ehrIc",
  authDomain: "pinboard-25.firebaseapp.com",
  databaseURL: "https://pinboard-25.firebaseio.com",
  projectId: "pinboard-25",
  storageBucket: "pinboard-25.appspot.com",
  messagingSenderId: "649585637777",
  appId: "1:649585637777:web:07f6bc2b38cb1ef7f90230",
  measurementId: "G-1VTSFT88XS",
}
firebase.initializeApp(config)

class App extends React.Component {
  state = {
    isSignedIn: false,
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }))
  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="signin-container">
          <div className="signin-ui-container">
            <div className="signin-ui-text-wrap">
              <h2>ProjectHub</h2>
              <h4 className="signin-subtit">Keep your ideas and explore</h4>
            </div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      )
    } else {
      const db = firebase.firestore()

      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("user").doc(user.uid).set(
          {
            Name: user.displayName,
          },
          {
            merge: true,
          }
        )
      })

      let user = firebase.auth().currentUser
      user.updateProfile({
        photoURL: "/images/user.jpg",
      })

      return (
        <div>
          <p>登录进来了</p>
          <button onClick={() => firebase.auth().signOut()}>退出</button>
        </div>
      )
    }
  }
}

export default App
