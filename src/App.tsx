import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Switch, Route, useLocation } from 'react-router-dom'
import firebase from 'firebase'

//所有主组件
import { Home } from './components/Home'
import { Status } from './components/Status'
import { Explore } from './components/Explore'
import { Group } from './components/Group'
import { Mission } from './components/Mission'
import { Friends } from './components/Friends'
import { Moment } from './components/Moment'
import { Setting } from './components/Setting'
import { FAQ } from './components/FAQ'
import { CreateProject } from './components/Common/CreateProject'

//导航，副组件根据ref来决定渲染内容
import { ProfileMenu } from './components/Navigation/ProfileMenu'
import { Edit } from './components/Common/Edit'
import { Kanban } from './components/Home/Kanban'
import { UserProfile } from './components/Common/UserProfile'
import { GroupForm } from './components/Group/GroupForm'
import { GroupPost } from './components/Group/GroupPost'
import { GroupFormEdit } from './components/Group/GroupFormEdit'

export default function App() {
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser

  //全局样式化
  //侧边导航栏样式
  const [theme, setTheme] = useState('#0e5dd3')

  //背景样式
  const [options, setOptions] = useState('Color')
  const [customBg, setCustomBg] = useState<any>([])
  const [demo, setDemo] = useState<any>({
    backgroundColor: true,
    backgroundRef: '',
  })

  //透明度样式
  const [opacity, setOpacity] = useState({
    sidebar: 100,
    topbar: 100,
    card: 100,
    background: 50,
  })

  const [profile, setProfile] = useState({})
  const [avatar, setAvatar] = useState('/images/user.jpg')

  //初始化读取数据库 判断用户是否有过记录
  useEffect(() => {
    // firebase.auth().onAuthStateChanged(user => {
    //将用户加入到所有用户列表
    db.collection('friends')
      .doc(user.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          db.collection('friends')
            .doc(user.uid)
            .set({
              avatar: '/images/user.jpg',
              profile: {
                profileName: user.displayName,
                profileBio: '',
                profileEmail: user.email,
                profileGithub: '',
                profileLocation: '',
                profileWeb: '',
                profilelinkedin: '',
              },
              Key: user.uid,
            })
        }
      })

    const settingRef = db.collection('user').doc(user.uid).collection('Setting')

    const langRef = settingRef.doc('Language')
    const apparenceRef = settingRef.doc('Apparence')
    const profileRef = settingRef.doc('Profile')

    profileRef.get().then((doc: any) => {
      if (!doc.exists) {
        console.log(doc)
        profileRef.set({
          avatar: '/images/user.jpg',
          profile: {
            profileName: '',
            profileBio: '',
            profileEmail: '',
            profileGithub: '',
            profileLocation: '',
            profileWeb: '',
            profilelinkedin: '',
          },
        })
      } else {
        setAvatar(doc.data().avatar)
        setProfile(doc.data().profile)
      }
    })

    langRef.get().then(doc => {
      if (!doc.exists) {
        langRef.set({
          Language: 'English',
        })
      }
    })

    apparenceRef
      .get()
      .then((doc: any) => {
        if (!doc.exists) {
          apparenceRef.set({
            theme: '#0e5dd3',
            opacity: {
              sidebar: 100,
              topbar: 100,
              card: 100,
              background: 50,
            },
            background: '#f7f7f7',
            backgroundColor: true,
          })
        } else {
          setTheme(doc.data().theme)
          setOptions(doc.data().backgroundColor ? 'Color' : 'Images')
          setDemo(() => ({
            backgroundColor: doc.data().backgroundColor,
            backgroundRef: doc.data().background,
          }))
          setOpacity(doc.data().opacity)
        }
      })
      .catch(error => {
        console.log(`读取用户保存的壁纸时出错了 ${error}`)
      })
    // })
  }, [db, user.displayName, user.email, user.uid])

  //用户当前所在的route
  const currRoute = useLocation().pathname

  // active css style 当前所在的route对应的nav icon样式化
  const currLinkStyle: any = {
    backgroundColor: 'white',
    color: `${theme}`,
    padding: '5px',
    borderRadius: '50%',
  }

  //颜色有更改时 写入到数据库
  const handleTheme = (color: any, event: any) => {
    // firebase.auth().onAuthStateChanged(user => {
    db.collection('user')
      .doc(user.uid)
      .collection('Setting')
      .doc('Apparence')
      .update({
        theme: color.hex,
      })
      .then(() => {
        setTheme(color.hex)
        console.log(`主题色修改成功为${color.hex}`)
      })
      .catch(error => {
        console.log(`更改主题色时出错啦${error}`)
      })
    // })
  }

  //渲染是以照片还是纯色模式为背景
  const handleOptions = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setOptions(event.target.value)
    console.log(options)
  }

  //用户点击壁纸缩略图时更改实时预览demo
  const handleSwitch = (event: { currentTarget: { id: any } }) => {
    let bgRef = event.currentTarget.id
    setDemo(() => ({
      backgroundColor: false,
      backgroundRef: bgRef,
    }))
    //同时更新到数据库
    // firebase.auth().onAuthStateChanged(user => {
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
      .catch(error => {
        console.log(`切换背景错误${error}`)
      })
    // })
  }

  //用户点击卡色 写入数据库
  const handleColor = (color: any, event: any) => {
    // firebase.auth().onAuthStateChanged(user => {
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
      .catch(error => {
        console.log(`更改主题色时出错啦${error}`)
      })
    // })
  }

  //更改透明度
  const handleOpacity = (name: any) => (event: any, value: any) => {
    setOpacity(prevOpacity => ({
      ...prevOpacity,
      [name]: value,
    }))
    // firebase.auth().onAuthStateChanged(user => {
    db.collection('user')
      .doc(user.uid)
      .collection('Setting')
      .doc('Apparence')
      .update({
        opacity,
      })
    // })
  }

  return (
    <div>
      {/* Global CSS styles */}
      {demo.backgroundColor ? (
        <div
          style={{
            backgroundColor: demo.backgroundRef,
            transition: 'all 2s',
          }}
          className="background"
        ></div>
      ) : (
        <div
          style={{ backgroundImage: `url(${demo.backgroundRef})` }}
          className="background-img"
        ></div>
      )}
      {/* Overlay for backgroud image to control opacity */}
      <div
        className="overlay"
        style={{ opacity: opacity.background / 100 }}
      ></div>

      {/* Content container */}
      <div className="content-container">
        <img className="logo" src="/images/logo.png" alt="" />

        {/* Side nav bar */}
        <div
          className="navbar"
          style={{ backgroundColor: theme, opacity: opacity.sidebar / 100 }}
        >
          <Link to="/">
            <i
              style={currRoute === '/' ? currLinkStyle : null}
              className="fas fa-home"
            ></i>
          </Link>
          <Link to="/status">
            <i
              style={currRoute === '/status' ? currLinkStyle : null}
              className="fas fa-tachometer-alt"
            ></i>
          </Link>
          <Link to="/explore">
            <i
              style={currRoute === '/explore' ? currLinkStyle : null}
              className="fab fa-wpexplorer"
            ></i>
          </Link>
          <Link to="/group">
            <i
              style={currRoute === '/group' ? currLinkStyle : null}
              className="far fa-calendar-alt"
            ></i>
          </Link>

          <Link to="/friends">
            <i
              style={currRoute === '/friends' ? currLinkStyle : null}
              className="fas fa-user-friends"
            ></i>
          </Link>
          <Link to="/moment">
            <i
              style={currRoute === '/moment' ? currLinkStyle : null}
              className="far fa-clock"
            ></i>
          </Link>
          <Link to="/setting/profile">
            <i
              style={currRoute === `/setting/profile` ? currLinkStyle : null}
              className="fas fa-sliders-h"
            ></i>
          </Link>
          <Link to="/faq">
            <i
              style={currRoute === '/faq' ? currLinkStyle : null}
              className="far fa-question-circle"
            ></i>
          </Link>
          <Link to="/mission">
            <i
              style={currRoute === '/mission' ? currLinkStyle : null}
              className="fas fa-exclamation-circle"
            ></i>
          </Link>
          <Link to="/create">
            <i
              style={currRoute === '/create' ? currLinkStyle : null}
              className="fas fa-feather"
            ></i>
          </Link>
          <Link to="/noidea">
            <i
              style={currRoute === '/noidea' ? currLinkStyle : null}
              className="fas fa-sign-out-alt"
            ></i>
          </Link>
        </div>

        {/* Header bar with notification and current page title */}
        <div className="user-navbar" style={{ opacity: opacity.topbar / 100 }}>
          <h2>Project Dashboard</h2>
          <div className="user-navbar-icon">
            <i className="fas fa-inbox"></i>
            <i className="fas fa-bell"></i>
            <ProfileMenu avatar={avatar} />
          </div>
        </div>

        {/* Router switch URL */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/status">
            <Status />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/group">
            <Group />
          </Route>
          <Route path="/mission/">
            <Mission />
          </Route>
          <Route exact path="/friends/">
            <Friends />
          </Route>
          <Route path="/moment">
            <Moment profile={profile} avatar={avatar} />
          </Route>
          <Route path="/setting/">
            <Setting
              avatar={avatar}
              demo={demo}
              options={options}
              customBg={customBg}
              opacity={opacity}
              switchImgPreview={handleSwitch}
              switchColorPreview={handleColor}
              switchOption={handleOptions}
              switchTheme={handleTheme}
              swicthOpacity={handleOpacity}
            />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/create">
            <CreateProject />
          </Route>
          <Route path="/request">
            <GroupForm />
          </Route>

          <Route exact path="/grouppost">
            <GroupPost />
          </Route>

          <Route path="/grouppost/:ref">
            <GroupFormEdit />
          </Route>

          {/* Other nested router */}
          <Route path="/edit/:ref">
            <Edit />
          </Route>
          <Route path="/kanban/:ref">
            <Kanban />
          </Route>
          <Route path="/friends/:ref">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
