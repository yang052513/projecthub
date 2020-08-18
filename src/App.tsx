import React from 'react'
import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import firebase from 'firebase'

//所有主组件
import {
  Home,
  Status,
  Explore,
  Group,
  Messenger,
  Friends,
  Moment,
  Setting,
  FAQ,
} from './components/index'

import { CreateProject } from './components/shared/CreateProject'

//导航，副组件根据ref来决定渲染内容
import { ProfileMenu } from './components/navigation/ProfileMenu'
import { Edit } from './components/shared/Edit'
import { HomeKanban } from './components/home/HomeKanban'
import { UserProfile } from './components/shared/UserProfile'
import { GroupForm } from './components/group/GroupForm'
import { GroupPost } from './components/group/GroupPost'
import { GroupFormEdit } from './components/group/GroupFormEdit'

import { SideNavItem } from './components/navigation/SideNavItem'
import { NotificationMenu } from './components/notification/NotificationMenu'

import { MomentUser } from './components/moment/MomentUser'
import { Header } from './components/navigation/Header'
import { initStatusActivity } from './modules/status'

import { Navigator } from './router/Navigator'
import { SideNavBar } from './components/navigation/SideNavBar'
import { NavigationHeader } from './components/navigation/NavigationHeader'

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
    initStatusActivity(user.uid)
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
        <SideNavBar opacity={opacity} theme={theme} />

        {/* Header bar with notification and current page title */}
        {/* <div className="user-navbar" style={{ opacity: opacity.topbar / 100 }}>
          <Header />
          <div className="user-navbar-icon">
            <NotificationMenu />
            <ProfileMenu avatar={avatar} />
          </div>
        </div> */}
        <NavigationHeader opacity={opacity} avatar={avatar} />

        {/* Router switch URL */}
        <Navigator
          avatar={avatar}
          profile={profile}
          demo={demo}
          options={options}
          customBg={customBg}
          opacity={opacity}
          handleColor={handleColor}
          handleOpacity={handleOpacity}
          handleOptions={handleOptions}
          handleSwitch={handleSwitch}
          handleTheme={handleTheme}
        />
      </div>
    </div>
  )
}
