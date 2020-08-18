import React from 'react'
import { useState, useEffect } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { initStatusActivity } from './modules/status'
import { Navigator } from './router/Navigator'
import { SideNavBar } from './components/navigation/SideNavBar'
import { NavigationHeader } from './components/navigation/NavigationHeader'

import { ProfileContext } from './context/ProfileContext'
import { useFetchProfile } from './hooks/useFetchProfile'

export default function App() {
  const user: firebase.User | null = firebase.auth().currentUser
  const userProfile = useFetchProfile(user!.uid)
  //全局样式化
  const [theme, setTheme] = useState('#0e5dd3')
  const [options, setOptions] = useState('Color')
  const [customBg, setCustomBg] = useState<any>([])
  const [demo, setDemo] = useState<any>({
    backgroundColor: true,
    backgroundRef: '',
  })
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
    initStatusActivity(user!.uid)
    //将用户加入到所有用户列表
    firebase
      .firestore()
      .collection('friends')
      .doc(user!.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          firebase
            .firestore()
            .collection('friends')
            .doc(user!.uid)
            .set({
              avatar: '/images/user.jpg',
              profile: {
                profileName: user!.displayName,
                profileBio: '',
                profileEmail: user!.email,
                profileGithub: '',
                profileLocation: '',
                profileWeb: '',
                profilelinkedin: '',
              },
              Key: user!.uid,
            })
        }
      })

    const settingRef = firebase
      .firestore()
      .collection('user')
      .doc(user!.uid)
      .collection('Setting')

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
    firebase
      .firestore()
      .collection('user')
      .doc(user!.uid)
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
    firebase
      .firestore()
      .collection('user')
      .doc(user!.uid)
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
  }

  //用户点击卡色 写入数据库
  const handleColor = (color: any, event: any) => {
    firebase
      .firestore()
      .collection('user')
      .doc(user!.uid)
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
  }

  //更改透明度
  const handleOpacity = (name: any) => (event: any, value: any) => {
    setOpacity(prevOpacity => ({
      ...prevOpacity,
      [name]: value,
    }))
    firebase
      .firestore()
      .collection('user')
      .doc(user!.uid)
      .collection('Setting')
      .doc('Apparence')
      .update({
        opacity,
      })
  }

  return (
    <ProfileContext.Provider value={userProfile}>
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

          <SideNavBar opacity={opacity} theme={theme} />
          <NavigationHeader opacity={opacity} avatar={avatar} />

          {/* Router */}
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
    </ProfileContext.Provider>
  )
}
