import React from 'react'
import { Link, Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Profile from './Setting/Profile'
import Apparence from './Setting/Apparence'
import Language from './Setting/Language'
import About from './Setting/About'
import ChangeLog from './Setting/Changelog'

function Setting(props) {
  let location = useLocation()

  const currPathStyle = {
    color: 'rgb(14,93,211)',
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
                <Profile />
              </Route>
              <Route path="/setting/theme">
                <Apparence
                  options={props.options}
                  demo={props.demo}
                  customBg={props.customBg}
                  opacity={props.opacity}
                  switchImgPreview={props.switchImgPreview}
                  switchColorPreview={props.switchColorPreview}
                  switchOption={props.switchOption}
                  switchTheme={props.switchTheme}
                  swicthOpacity={props.swicthOpacity}
                />
              </Route>
              <Route path="/setting/language">
                <Language />
              </Route>
              <Route path="/setting/about">
                <About />
              </Route>
              <Route path="/setting/changelog">
                <ChangeLog />
              </Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Setting
