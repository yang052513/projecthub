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
import { CreateProject } from '../components/shared/CreateProject'
import { GroupForm } from '../components/group/GroupForm'
import { GroupFormEdit } from '../components/group/GroupFormEdit'
import { GroupPost } from '../components/group/GroupPost'
import { MomentUser } from '../components/moment/MomentUser'
import { Edit } from '../components/shared/Edit'
import { HomeKanban } from '../components/home/HomeKanban'
import { UserProfile } from '../components/shared/UserProfile'

interface Props {
  avatar: string
  profile: any
  demo: any
  options: string
  customBg: any
  opacity: any
  handleSwitch: (event: { currentTarget: { id: any } }) => void
  handleColor: (color: any, event: any) => void
  handleOptions: (event: {
    target: { value: React.SetStateAction<string> }
  }) => void
  handleTheme: (color: any, event: any) => void
  handleOpacity: (color: any, event: any) => void
}

export const Navigator: React.FC<Props> = ({
  avatar,
  profile,
  demo,
  options,
  customBg,
  opacity,
  handleColor,
  handleOpacity,
  handleOptions,
  handleSwitch,
  handleTheme,
}) => {
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
        <Moment profile={profile} avatar={avatar} />
      </Route>
      <Route path="/setting/">
        <Setting
          avatar={avatar}
          demo={demo}
          options={options}
          customBg={customBg}
          opacity={opacity}
          switchImgPreview={handleSwitch}
          switchColorPreview={handleColor}
          switchOption={handleOptions}
          switchTheme={handleTheme}
          swicthOpacity={handleOpacity}
        />
      </Route>
      <Route path="/faq">
        <FAQ />
      </Route>
      <Route path="/create">
        <CreateProject />
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
        <Edit />
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
