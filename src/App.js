import React from 'react'
import { useState, useEffect } from 'react'
import {
  Link,
  Switch,
  Route,
  withRouter,
  BrowserRouter as Router,
} from 'react-router-dom'
import Home from './components/Home'
import Setting from './components/Setting'
import Status from './components/Status'
import Explore from './components/Explore'
import CreateProject from './components/CreateProject'
import ProfileMenu from './components/ProfileMenu'
import Edit from './components/Edit'
import Kanban from './components/Home/Kanban'
import Mission from './components/Mission'

import firebase from 'firebase'

export default function App() {
  const db = firebase.firestore()

  const [customBg, setCustomBg] = useState([])
  const [demo, setDemo] = useState({
    backgroundColor: true,
    backgroundRef: '',
  })
  const [options, setOptions] = useState('Color')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .get()
        .then((doc) => {
          //如果用户保存过更改
          if (doc.data().customBackground) {
            setCustomBg(doc.data().customBackground)
          }
          if (doc.data().background) {
            setDemo(() => ({
              backgroundColor: doc.data().backgroundColor,
              backgroundRef: doc.data().background,
            }))
            setOptions(doc.data().backgroundColor ? 'Color' : 'Images')
            //默认样式 灰色背景
          } else {
            db.collection('user')
              .doc(user.uid)
              .collection('Setting')
              .doc('Apparence')
              .update({
                background: '#f7f7f7',
                backgroundColor: true,
              })
          }
        })
        .catch((error) => {
          console.log(`读取用户保存的壁纸时出错了 ${error}`)
        })
    })
  }, [])

  function handleSwitch(event) {
    let bgRef = event.currentTarget.id
    setDemo(() => ({
      backgroundColor: false,
      backgroundRef: bgRef,
    }))
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .update({
          backgroundColor: false,
          background: bgRef,
        })
        .then(() => {
          console.log(`切换背景到数据库${bgRef}`)
        })
        .catch((error) => {
          console.log(`切换背景错误${error}`)
        })
    })
  }

  function handleColor(color, event) {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .update({
          backgroundColor: true,
          background: color.hex,
        })
        .then(() => {
          setDemo(() => ({
            backgroundColor: true,
            backgroundRef: color.hex,
          }))
          console.log(`主题色修改成功为${color.hex}`)
        })
        .catch((error) => {
          console.log(`更改主题色时出错啦${error}`)
        })
    })
  }

  //渲染是以照片还是纯色模式为背景
  const handleOptions = (event) => {
    setOptions(event.target.value)
    console.log(options)
  }

  return (
    <div>
      <Router>
        {demo.backgroundColor ? (
          <div
            style={{ backgroundColor: demo.backgroundRef }}
            className="background"
          ></div>
        ) : (
          <img className="background-image" src={demo.backgroundRef} />
        )}

        <div className="overlay"></div>

        {/* 内容容器 */}
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
              <Setting
                demo={demo}
                options={options}
                customBg={customBg}
                switchImgPreview={handleSwitch}
                switchColorPreview={handleColor}
                switchOption={handleOptions}
              />
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
    </div>
  )
}
