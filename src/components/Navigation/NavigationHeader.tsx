import React from 'react'
import { Header } from './Header'
import { NotificationMenu } from '../notification/NotificationMenu'
import { ProfileMenu } from './ProfileMenu'

interface Props {
  opacity: any
  avatar: string
}

export const NavigationHeader: React.FC<Props> = ({ opacity, avatar }) => {
  return (
    // Header bar with notification and current page title
    <div className="user-navbar" style={{ opacity: opacity.topbar / 100 }}>
      <Header />
      <div className="user-navbar-icon">
        <NotificationMenu />
        <ProfileMenu avatar={avatar} />
      </div>
    </div>
  )
}
