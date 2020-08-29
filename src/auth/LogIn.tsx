import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'

const config = {
  apiKey: 'AIzaSyADkkb297MIxw6TMNeodIEIJQQC86ehrIc',
  authDomain: 'pinboard-25.firebaseapp.com',
  databaseURL: 'https://pinboard-25.firebaseio.com',
  projectId: 'pinboard-25',
  storageBucket: 'pinboard-25.appspot.com',
  messagingSenderId: '649585637777',
  appId: '1:649585637777:web:07f6bc2b38cb1ef7f90230',
  measurementId: 'G-1VTSFT88XS',
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
