import React from 'react'
import { SideNavItem } from './SideNavItem'

interface Props {
  theme: string
  opacity: any
}
export const SideNavBar: React.FC<Props> = ({ theme, opacity }) => {
  return (
    <div
      className="navbar"
      style={{ backgroundColor: theme, opacity: opacity.sidebar / 100 }}
    >
      <SideNavItem theme={theme} route={'/'} icon="fas fa-home" prompt="Home" />
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
  )
}
