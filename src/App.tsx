// React
import React from 'react'
import { useState, useEffect } from 'react'

// Firebase 数据库
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Context
import { ProfileContext } from './context/ProfileContext'
import { ThemeContext } from './context/ThemeContext'

// Modules, helper, hooks
import {
  initStatusActivity,
  initFriendCollection,
  initUserLanguage,
} from './modules/initApp'
import { useFetchProfile } from './hooks/useFetchProfile'
import { useTheme } from './hooks/useTheme'

// Router 路由
import { Navigator } from './router/Navigator'

// Shared Components 共享导航菜单 标题栏组件
import { NavigationSideNavBar } from './components/navigation/NavigationSideBar'
import { NavigationHeader } from './components/navigation/NavigationHeader'
import { ColorBackground } from './components/shared/ColorBackground'
import { ImageBackground } from './components/shared/ImageBackground'

/**
 * 组件加载入口 读取数据库并初始化App
 */
export default function App() {
  const user: firebase.User | null = firebase.auth().currentUser
  const userProfile = useFetchProfile(user!.uid)

  const {
    theme,
    handleTheme,
    handleColor,
    handleOpacity,
    handleOptions,
    handleSwitch,
  } = useTheme(user!.uid)

  // 初始化数据库
  useEffect(() => {
    initStatusActivity(user!.uid)
    initFriendCollection(user!.uid, user?.displayName, user?.email)
    initUserLanguage(user!.uid)
  }, [])

  const customTheme = {
    theme,
    handleTheme,
    handleOptions,
    handleSwitch,
    handleOpacity,
    handleColor,
  }

  return (
    <ThemeContext.Provider value={customTheme}>
      <ProfileContext.Provider value={userProfile}>
        <div className="app-container">
          {/* 渲染应用背景 图片/纯色 */}
          {theme.backgroundColor ? (
            <ColorBackground
              backgroundColor={theme.background}
              opacity={theme.opacity.background}
            />
          ) : (
            <ImageBackground
              backgroundUrl={theme.background}
              opacity={theme.opacity.background}
            />
          )}

          {/* 应用内容容器 */}
          <div className="content-container">
            <img className="logo" src="/images/logo.png" alt="" />

            <NavigationSideNavBar opacity={theme.opacity} theme={theme.theme} />
            <NavigationHeader opacity={theme.opacity} />

            {/* 路由组件 */}
            <Navigator />
          </div>
        </div>
      </ProfileContext.Provider>
    </ThemeContext.Provider>
  )
}
