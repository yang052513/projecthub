import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import firebase from 'firebase'

import Profile from './Setting/Profile'
import Theme from './Setting/Theme'
import Language from './Setting/Language'
import About from './Setting/About'
import ChangeLog from './Setting/Changelog'

function Setting() {
  return (
    <div className="component-layout setting-container">
      <div className="setting-side-nav">
        <Link to="/setting/profile">Profile</Link>
        <Link to="/setting/theme">Theme</Link>
        <Link to="/setting/language">Language</Link>
        <Link to="/setting/about">About</Link>
        <Link to="/setting/changelog">Change Log</Link>
      </div>

      <Switch>
        <Route exact path="/setting/profile">
          <Profile />
        </Route>
        <Route path="/setting/theme">
          <Theme />
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
    </div>
  )
}

export default Setting
