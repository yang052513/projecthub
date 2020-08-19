import React from 'react'
import { Header } from './Header'
import { NotificationMenu } from '../notification/NotificationMenu'
import { ProfileMenu } from './ProfileMenu'

interface Props {
  opacity: any
}

export const NavigationHeader: React.FC<Props> = ({ opacity }) => {
  return (
    // Header bar with notification and current page title
    <div className="user-navbar" style={{ opacity: opacity.topbar / 100 }}>
      <Header />
      <div className="user-navbar-icon">
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </div>
  )
}
