import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {
  Home,
  Status,
  Explore,
  Group,
  Messenger,
  Friends,
  Moment,
  Setting,
  FAQ,
} from '../components/index'
import { HomeCreateForm } from '../components/home/HomeCreateForm'
import { GroupForm } from '../components/group/GroupForm'
import { GroupFormEdit } from '../components/group/GroupFormEdit'
import { GroupPost } from '../components/group/GroupPost'
import { MomentUser } from '../components/moment/MomentUser'
import { HomeEditForm } from '../components/home/HomeEditForm'
import { HomeKanban } from '../components/home/HomeKanban'
import { UserProfile } from '../components/shared/UserProfile'

export const Navigator: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/status">
        <Status />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
      <Route path="/group">
        <Group />
      </Route>
      <Route path="/messenger/">
        <Messenger />
      </Route>
      <Route exact path="/friends/">
        <Friends />
      </Route>
      <Route exact path="/moment">
        <Moment />
      </Route>
      <Route path="/setting/">
        <Setting />
      </Route>
      <Route path="/faq">
        <FAQ />
      </Route>
      <Route path="/create">
        <HomeCreateForm />
      </Route>
      <Route path="/request">
        <GroupForm />
      </Route>
      <Route exact path="/grouppost">
        <GroupPost />
      </Route>
      <Route path="/grouppost/:ref">
        <GroupFormEdit />
      </Route>
      <Route path="/moment/:ref">
        <MomentUser />
      </Route>
      {/* Other nested router */}
      <Route path="/edit/:ref">
        <HomeEditForm />
      </Route>
      <Route path="/kanban/:ref">
        <HomeKanban />
      </Route>
      <Route path="/friends/:ref">
        <UserProfile />
      </Route>
    </Switch>
  )
}
