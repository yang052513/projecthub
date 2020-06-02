import React from 'react'
import { Link, Switch, Route, useLocation, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Profile from './Setting/Profile'
import Apparence from './Setting/Apparence'
import Language from './Setting/Language'
import About from './Setting/About'
import ChangeLog from './Setting/Changelog'

function Setting({ location }) {
  let currPath = useLocation().pathname
  const currPathStyle = {
    color: 'rgb(14,93,211)',
  }

  return (
    <div className="component-layout setting-container">
      <div className="setting-side-nav">
        <Link
          to="/setting/profile"
          style={currPath === '/setting/profile' ? currPathStyle : null}
        >
          Profile
        </Link>
        <Link
          to="/setting/theme"
          style={currPath === '/setting/theme' ? currPathStyle : null}
        >
          Apparence
        </Link>
        <Link
          to="/setting/language"
          style={currPath === '/setting/language' ? currPathStyle : null}
        >
          Language
        </Link>
        <Link
          to="/setting/about"
          style={currPath === '/setting/about' ? currPathStyle : null}
        >
          About
        </Link>
        <Link
          to="/setting/changelog"
          style={currPath === '/setting/changelog' ? currPathStyle : null}
        >
          Change Log
        </Link>
      </div>

      <TransitionGroup className="setting-content-container">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 1000, exit: 1000 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>
              <Route exact path="/setting/profile">
                <Profile />
              </Route>
              <Route path="/setting/theme">
                <Apparence />
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

export default withRouter(Setting)
