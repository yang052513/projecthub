// React
import React from 'react'
import { useState, useEffect } from 'react'

// Firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Context
import { ProfileContext } from './context/ProfileContext'
import { ThemeContext } from './context/ThemeContext'

import {
  initStatusActivity,
  initFriendCollection,
  initUserProfile,
  initUserLanguage,
} from './modules/initApp'
import { Navigator } from './router/Navigator'
import { SideNavBar } from './components/navigation/SideNavBar'
import { NavigationHeader } from './components/navigation/NavigationHeader'
import { useFetchProfile } from './hooks/useFetchProfile'
import { useTheme } from './hooks/useTheme'

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

  useEffect(() => {
    initStatusActivity(user!.uid)
    initFriendCollection(user!.uid, user?.displayName, user?.email)
    initUserProfile(user!.uid)
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
        <div>
          {/* Global CSS styles */}
          {theme.backgroundColor ? (
            <div
              style={{
                backgroundColor: theme.background,
                transition: 'all 2s',
              }}
              className="background"
            ></div>
          ) : (
            <div
              style={{ backgroundImage: `url(${theme.background})` }}
              className="background-img"
            ></div>
          )}

          {/* Overlay for backgroud image to control opacity */}
          <div
            className="overlay"
            style={{ opacity: theme.opacity.background / 100 }}
          ></div>

          {/* Content container */}
          <div className="content-container">
            <img className="logo" src="/images/logo.png" alt="" />

            <SideNavBar opacity={theme.opacity} theme={theme.theme} />
            <NavigationHeader
              opacity={theme.opacity}
              avatar={userProfile.avatar}
            />

            {/* Router */}
            <Navigator
              avatar={userProfile.avatar}
              profile={userProfile.profile}
            />
          </div>
        </div>
      </ProfileContext.Provider>
    </ThemeContext.Provider>
  )
}
