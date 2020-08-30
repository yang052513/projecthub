import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
  messagingSenderId: process.env.REACT_APP_SENDER,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(config)

class LogIn extends Component {
  state = {
    isSignedIn: false,
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }
  unregisterAuthObserver!: firebase.Unsubscribe

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }))
  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    //登陆界面
    if (!this.state.isSignedIn) {
      return (
        <div className="signin-container">
          <div className="signin-overlay"></div>

          <div className="signin-ui-container">
            <div className="signin-ui-text-wrap">
              <h2>ProjectHub</h2>
              <p className="signin-subtit">Keep your ideas and explore</p>
            </div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      )
    } else {
      // 认证成功
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid)
          db.collection('user').doc(user.uid).set({
            Name: user.displayName,
            Online: true,
          })
        }
      })
      return (
        <Router>
          <App />
        </Router>
      )
    }
  }
}

export default LogIn
