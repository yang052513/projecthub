import React from 'react'
import { NavigationSideBarItem } from './NavigationSideBarItem'

interface Props {
  theme: string
  opacity: any
}

export const NavigationSideNavBar: React.FC<Props> = ({ theme, opacity }) => {
  return (
    <div
      className="navbar"
      style={{ backgroundColor: theme, opacity: opacity.sidebar / 100 }}
    >
      <NavigationSideBarItem
        theme={theme}
        route={'/'}
        icon="fas fa-home"
        prompt="Home"
      />
      <NavigationSideBarItem
        theme={theme}
        route={'/status'}
        icon="fas fa-tachometer-alt"
        prompt="Status Analysis"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/explore'}
        icon="fab fa-wpexplorer"
        prompt="Explore Projects"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/group'}
        icon="far fa-calendar-alt"
        prompt="Group Projects"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/friends'}
        icon="fas fa-user-friends"
        prompt="Friends"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/messenger/chat'}
        icon="fab fa-facebook-messenger"
        prompt="Message"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/moment'}
        icon="far fa-clock"
        prompt="Moment"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/setting/profile'}
        icon="fas fa-sliders-h"
        prompt="Settings"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/faq'}
        icon="fas fa-book"
        prompt="Documentation"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/create'}
        icon="fas fa-feather"
        prompt="Create a Project"
      />

      <NavigationSideBarItem
        theme={theme}
        route={'/noidea'}
        icon="fas fa-sign-out-alt"
        prompt="Logout"
      />
    </div>
  )
}
