import React from 'react'
import { Link, Switch, Route, useLocation } from 'react-router-dom'
import { MessengerListChat } from './MessengerList/MessengerListChat'
import { MessengerListFriend } from './MessengerList/MessengerListFriend'
import { MessengerListRequest } from './MessengerList/MessengerListRequest'
export const MessengerList: React.FC = () => {
  return (
    <div className="messenger-list-container">
      <Switch>
        <Route exact path="/messenger">
          <MessengerListChat />
        </Route>
        <Route path="/messenger/friends">
          <MessengerListFriend />
        </Route>

        <Route path="/messenger/request">
          <MessengerListRequest />
        </Route>
      </Switch>
    </div>
  )
}
