import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Status from './components/Status'
import Explore from './components/Explore'

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

class App extends React.Component {
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
      const db = firebase.firestore()

      firebase.auth().onAuthStateChanged(function (user) {
        db.collection('user').doc(user.uid).set(
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
        photoURL: '/images/user.jpg',
      })

      return (
        <Router>
          <div>
            <img className="logo" src="/images/logo.png" />

            {/* 侧边导航栏 */}
            <div className="navbar">
              <Link to="/">
                <i className="fas fa-home"></i>
              </Link>
              <Link to="/profile">
                <i className="fas fa-user-friends"></i>
              </Link>
              <Link to="/status">
                <i className="fas fa-tachometer-alt"></i>
              </Link>
              <Link to="/explore">
                <i className="fas fa-comments"></i>
              </Link>

              {/* 之后可能会添加的功能lol */}
              <Link to="/explore">
                <i className="far fa-clock"></i>
              </Link>
              <Link to="/explore">
                <i className="far fa-calendar-alt"></i>
              </Link>
              <Link to="/explore">
                <i className="fas fa-sliders-h"></i>
              </Link>
              <Link to="/explore">
                <i className="far fa-question-circle"></i>
              </Link>
              <Link to="/profile">
                <img src="/images/user.jpg" alt="user profile images" />
              </Link>

              <Link to="/explore">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            </div>

            {/* 顶部菜单栏 */}
            <div className="user-navbar">
              <h2>Project Dashboard</h2>
              <div>
                <i className="fas fa-inbox"></i>
                <i className="fas fa-bell"></i>
                <img src="/images/user.jpg" alt="user profile images" />
              </div>
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>

              <Route path="/status">
                <Status />
              </Route>

              <Route path="/explore">
                <Explore />
              </Route>
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App
