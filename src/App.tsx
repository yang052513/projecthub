import React from 'react'
import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import firebase from 'firebase'

//所有主组件
import { Home } from './components/Home'
import { Status } from './components/Status'
import { Explore } from './components/Explore'
import { Group } from './components/Group'
import { Messenger } from './components/Messenger'
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

import { SideNavItem } from './components/Navigation/SideNavItem'
import { NotificationMenu } from './components/Notification/NotificationMenu'

import { MomentUser } from './components/Moment/MomentUser'
import { Header } from './components/Navigation/Header'

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

  const statRef = db.collection('user').doc(user.uid).collection('Statistics')
  //初始化读取数据库 判断用户是否有过记录
  useEffect(() => {
    db.collection('user')
      .doc(user.uid)
      .collection('Statistics')
      .doc('00')
      .get()
      .then(doc => {
        if (!doc.exists) {
          statRef.doc('00').set({
            Label: 'January',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('01').set({
            Label: 'February',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('02').set({
            Label: 'March',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('03').set({
            Label: 'April',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('04').set({
            Label: 'May',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('05').set({
            Label: 'June',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('06').set({
            Label: 'July',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('07').set({
            Label: 'August',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('08').set({
            Label: 'September',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('09').set({
            Label: 'October',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('10').set({
            Label: 'November',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
          statRef.doc('11').set({
            Label: 'December',
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
        }
      })
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
  }, [])

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
    db.collection('user')
      .doc(user.uid)
      .collection('Setting')
      .doc('Apparence')
      .update({
        opacity,
      })
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
          <SideNavItem
            theme={theme}
            route={'/'}
            icon="fas fa-home"
            prompt="Home"
          />
          <SideNavItem
            theme={theme}
            route={'/status'}
            icon="fas fa-tachometer-alt"
            prompt="Status Analysis"
          />

          <SideNavItem
            theme={theme}
            route={'/explore'}
            icon="fab fa-wpexplorer"
            prompt="Explore Projects"
          />

          <SideNavItem
            theme={theme}
            route={'/group'}
            icon="far fa-calendar-alt"
            prompt="Group Projects"
          />

          <SideNavItem
            theme={theme}
            route={'/friends'}
            icon="fas fa-user-friends"
            prompt="Friends"
          />

          <SideNavItem
            theme={theme}
            route={'/messenger/chat'}
            icon="fab fa-facebook-messenger"
            prompt="Message"
          />

          <SideNavItem
            theme={theme}
            route={'/moment'}
            icon="far fa-clock"
            prompt="Moment"
          />

          <SideNavItem
            theme={theme}
            route={'/setting/profile'}
            icon="fas fa-sliders-h"
            prompt="Settings"
          />

          <SideNavItem
            theme={theme}
            route={'/faq'}
            icon="fas fa-book"
            prompt="Documentation"
          />

          <SideNavItem
            theme={theme}
            route={'/create'}
            icon="fas fa-feather"
            prompt="Create a Project"
          />

          <SideNavItem
            theme={theme}
            route={'/noidea'}
            icon="fas fa-sign-out-alt"
            prompt="Logout"
          />
        </div>

        {/* Header bar with notification and current page title */}
        <div className="user-navbar" style={{ opacity: opacity.topbar / 100 }}>
          <Header />
          <div className="user-navbar-icon">
            <NotificationMenu />
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
          <Route path="/messenger/">
            <Messenger />
          </Route>
          <Route exact path="/friends/">
            <Friends />
          </Route>
          <Route exact path="/moment">
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

          <Route path="/moment/:ref">
            <MomentUser />
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
