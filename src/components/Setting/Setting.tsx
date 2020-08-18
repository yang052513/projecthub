import React from 'react'
import { Link, Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { Profile } from './Profile'
import { Apparence } from './Apparence'
import { Language } from './Language'
import { About } from './About'
import { ChangeLog } from './Changelog'

interface Props {
  avatar: string | null | undefined
  demo: string | null | undefined
  options: string | null | undefined
  customBg: string | null | undefined
  opacity: object | null | undefined
  switchImgPreview: any
  switchColorPreview: any
  switchOption: any
  switchTheme: any
  swicthOpacity: any
}

export const Setting: React.FC<Props> = ({
  avatar,
  demo,
  options,
  customBg,
  opacity,
  swicthOpacity,
  switchColorPreview,
  switchImgPreview,
  switchOption,
  switchTheme,
}) => {
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
                <Profile avatar={avatar} />
              </Route>
              <Route path="/setting/theme">
                <Apparence
                  options={options}
                  demo={demo}
                  customBg={customBg}
                  opacity={opacity}
                  switchImgPreview={switchImgPreview}
                  switchColorPreview={switchColorPreview}
                  switchOption={switchOption}
                  switchTheme={switchTheme}
                  swicthOpacity={swicthOpacity}
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
