import React from 'react'
import { MessengerList } from './Messenger/MessengerList'
import { MessengerChat } from './Messenger/MessengerChat'
import { MessengerPanel } from './Messenger/MessengerPanel'
import { Switch, Route } from 'react-router-dom'
import { MessengerFriend } from './Messenger/MessengerFriend'

export const Messenger: React.FC = () => {
  return (
    <div className="messenger-container">
      <MessengerPanel />
      <MessengerList />

      <Switch>
        <Route path="/messenger/chat/:ref">
          <MessengerChat />
        </Route>

        <Route path="/messenger/chat">
          <MessengerFriend />
        </Route>

        <Route path="/messenger/friends">
          <MessengerFriend />
        </Route>

        <Route path="/messenger/request">
          <MessengerFriend />
        </Route>
      </Switch>
    </div>
  )
}
