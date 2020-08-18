import React from 'react'
import { MessengerList } from './MessengerList'
import { MessengerChat } from './MessengerChat'
import { MessengerPanel } from './MessengerPanel'
import { Switch, Route } from 'react-router-dom'
import { MessengerFriend } from './MessengerFriend'

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
