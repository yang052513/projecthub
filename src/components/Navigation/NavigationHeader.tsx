import React from 'react'
import {
  NavigationHeaderTitle,
  NavigationNotification,
  NavigationProfile,
} from './index'

interface Props {
  opacity: any
}

export const NavigationHeader: React.FC<Props> = ({ opacity }) => {
  return (
    <div className="user-navbar" style={{ opacity: opacity.topbar / 100 }}>
      <NavigationHeaderTitle />
      <div className="user-navbar-icon">
        <NavigationNotification />
        <NavigationProfile />
      </div>
    </div>
  )
}
