import React from 'react'
import { Link, Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {
  SettingAbout,
  SettingProfile,
  SettingTheme,
  SettingChangeLog,
  SettingLanguage,
} from './index'

export const Setting: React.FC = () => {
  let location = useLocation()

  const currPathStyle: any = {
    color: '#03a9f4',
    fontWeight: 'bold',
  }

  return (
    <div className="component-layout setting-container">
      <div className="setting-side-nav">
        <Link
          to="/setting/profile"
          style={
            location.pathname === '/setting/profile' ? currPathStyle : null
          }
        >
          Profile
        </Link>
        <Link
          to="/setting/theme"
          style={location.pathname === '/setting/theme' ? currPathStyle : null}
        >
          Apparence
        </Link>
        <Link
          to="/setting/language"
          style={
            location.pathname === '/setting/language' ? currPathStyle : null
          }
        >
          Language
        </Link>
        <Link
          to="/setting/about"
          style={location.pathname === '/setting/about' ? currPathStyle : null}
        >
          About
        </Link>
        <Link
          to="/setting/changelog"
          style={
            location.pathname === '/setting/changelog' ? currPathStyle : null
          }
        >
          Change Log
        </Link>
      </div>

      <TransitionGroup className="setting-content-container">
        <CSSTransition
          timeout={{ enter: 1000, exit: 1000 }}
          classNames="fade"
          key={location.key}
        >
          <section className="route-section">
            <Switch location={location}>
              <Route exact path="/setting/profile">
                <SettingProfile />
              </Route>
              <Route path="/setting/theme">
                <SettingTheme />
              </Route>
              <Route path="/setting/language">
                <SettingLanguage />
              </Route>
              <Route path="/setting/about">
                <SettingAbout />
              </Route>
              <Route path="/setting/changelog">
                <SettingChangeLog />
              </Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
