import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'
import Setting from './components/Setting'
import Status from './components/Status'
import Explore from './components/Explore'
import CreateProject from './components/CreateProject'
import ProfileMenu from './components/ProfileMenu'
import Edit from './components/Edit'
import Kanban from './components/Home/Kanban'
import Mission from './components/Mission'

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

class App extends Component {
  state = {
    isSignedIn: false,
    background: '',
    backgroundColor: true,
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
      firebase.auth().onAuthStateChanged((user) => {
        db.collection('user').doc(user.uid).set(
          {
            Name: user.displayName,
          },
          {
            merge: true,
          }
        )

        db.collection('user')
          .doc(user.uid)
          .collection('Setting')
          .doc('Apparence')
          .get()
          .then((doc) => {
            if (doc.data().background) {
              this.setState({
                background: doc.data().background,
                backgroundColor: doc.data().backgroundColor,
              })
            } else {
              db.collection('user')
                .doc(user.uid)
                .collection('Setting')
                .doc('Apparence')
                .update({
                  background: '/images/theme/background/default.jpg',
                  backgroundColor: true,
                })
              this.setState({
                background: '/images/theme/background/default.jpg',
                backgroundColor: true,
              })
            }
          })
      })

      return (
        <Router>
          {this.state.backgroundColor ? (
            <div
              style={{ backgroundColor: this.state.background }}
              className="background"
            ></div>
          ) : (
            <img className="background-image" src={this.state.background} />
          )}

          <div className="overlay"></div>
          <div className="content-container">
            <img className="logo" src="/images/logo.png" />

            {/* 侧边导航栏 */}
            <div className="navbar">
              <Link to="/">
                <i className="fas fa-home"></i>
              </Link>
              <Link to="/status">
                <i className="fas fa-tachometer-alt"></i>
              </Link>
              <Link to="/explore">
                <i className="fab fa-wpexplorer"></i>
              </Link>

              {/* 显示所有的用户 并可以搜寻 加好友 */}
              <Link to="/users">
                <i className="fas fa-user-friends"></i>
              </Link>

              {/* 动态类似朋友圈 */}
              <Link to="/moment">
                <i className="far fa-clock"></i>
              </Link>

              {/* 项目大厅 这里展示的是想找人一起的 加一个按钮可以发布 */}
              <Link to="/explore">
                <i className="far fa-calendar-alt"></i>
              </Link>

              <Link to="/setting/profile">
                <i className="fas fa-sliders-h"></i>
              </Link>

              {/* 软件疑难解答 加一个机器人 */}
              <Link to="/explore">
                <i className="far fa-question-circle"></i>
              </Link>

              {/* 系统随机分配的任务 */}
              <Link to="/mission">
                <i className="fas fa-book"></i>
              </Link>
              <Link to="/create">
                <i className="fas fa-feather"></i>
              </Link>

              <Link to="/explore">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            </div>

            {/* 顶部菜单栏 */}
            <div className="user-navbar">
              <h2>Project Dashboard</h2>
              <div className="user-navbar-icon">
                <i className="fas fa-inbox"></i>
                <i className="fas fa-bell"></i>
                <ProfileMenu />
              </div>
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/setting/">
                <Setting />
              </Route>
              <Route path="/mission/">
                <Mission />
              </Route>
              <Route path="/status">
                <Status />
              </Route>
              <Route path="/explore">
                <Explore />
              </Route>
              <Route path="/create">
                <CreateProject />
              </Route>
              <Route path="/edit/:ref">
                <Edit />
              </Route>
              <Route path="/kanban/:ref">
                <Kanban />
              </Route>
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App
