import React, { useState, useEffect } from 'react'

import firebase from 'firebase'

import { Switch, Route } from 'react-router-dom'
import { MessengerListChat } from './MessengerList/MessengerListChat'
import { MessengerListFriend } from './MessengerList/MessengerListFriend'
import { MessengerListRequest } from './MessengerList/MessengerListRequest'

export const MessengerList: React.FC = () => {
  const user: any = firebase.auth().currentUser

  const [friends, setFriends] = useState<any>([])
  const [request, setRequest] = useState<any>([])

  const fetchRequest = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Notification')
      .collection('Request')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          setRequest((prevRequest: any) => [...prevRequest, doc.data()])
        })
      })
  }

  useEffect(fetchRequest, [])

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
          <MessengerListRequest request={request} />
        </Route>
      </Switch>
    </div>
  )
}
