import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

export const NavigationHeaderTitle: React.FC = () => {
  const currRoute: any = useLocation().pathname

  const [headerTitle, setHeaderTitle] = useState<string>('')

  useEffect(() => {
    if (currRoute === '/status') {
      setHeaderTitle('ANALYSIS DASHBOARD')
    } else if (currRoute === '/') {
      setHeaderTitle('PROJECT DASHBOARD')
    } else if (currRoute === '/explore') {
      setHeaderTitle('EXPLORE PROJECTS')
    } else if (currRoute === '/group') {
      setHeaderTitle('FIND CONTRIBUTORS')
    } else if (currRoute === '/grouppost') {
      setHeaderTitle('MANAGE YOUR POST')
    } else if (currRoute === '/notification') {
      setHeaderTitle('NOTIFICATION CENTER')
    } else if (currRoute === '/friends') {
      setHeaderTitle('PROJECTHUB USERS')
    } else if (
      currRoute === '/messenger/chat' ||
      currRoute.includes('/messenger/chat')
    ) {
      setHeaderTitle('CHAT WITH FRIENDS')
    } else if (currRoute === '/messenger/friends') {
      setHeaderTitle('FRIEND LISTS')
    } else if (currRoute === '/messenger/request') {
      setHeaderTitle('FRIEND REQUEST')
    } else if (currRoute === '/moment') {
      setHeaderTitle('STORIES SHARE')
    } else if (currRoute === '/setting/profile') {
      setHeaderTitle('EDIT PROFILE')
    } else if (currRoute === '/setting/theme') {
      setHeaderTitle('EDIT THEME')
    } else if (currRoute === '/setting/language') {
      setHeaderTitle('EDIT LANGUAGE PREFERENCE')
    } else if (currRoute === '/setting/about') {
      setHeaderTitle('ABOUT PROJECTHUB')
    } else if (currRoute === '/setting/changelog') {
      setHeaderTitle('CHANGE LOG UPDATES')
    } else if (currRoute === '/faq') {
      setHeaderTitle('DOCUMENTATION')
    } else if (currRoute === '/create') {
      setHeaderTitle('CREATE A NEW PROJECT')
    } else if (currRoute.includes('kanban/')) {
      setHeaderTitle('PROJECT KANBAN')
    } else if (currRoute.includes('friends/') && currRoute !== '/friends') {
      setHeaderTitle('USER PROFILE')
    }
  }, [currRoute])

  return (
    <div className="navigation-header-logo">
      <img className="logo" src={logo} alt="" />
      <h2>{headerTitle}</h2>
    </div>
  )
}
