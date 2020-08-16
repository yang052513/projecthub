import React, { useState, useEffect } from 'react'

import firebase from 'firebase'

import { Switch, Route } from 'react-router-dom'
import { MessengerListChat } from './MessengerList/MessengerListChat'
import { MessengerListFriend } from './MessengerList/MessengerListFriend'
import { MessengerListRequest } from './MessengerList/MessengerListRequest'

export const MessengerList: React.FC = () => {
  const user: any = firebase.auth().currentUser

  const [friend, setFriend] = useState<any>([])
  const [request, setRequest] = useState<any>([])
  const latestMsgList = useState([])

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

  const fetchFriends = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          setFriend((prevFriend: any) => [...prevFriend, doc.data()])
        })
      })
  }

  useEffect(fetchRequest, [])
  useEffect(fetchFriends, [])

  return (
    <div className="messenger-list-container">
      <Switch>
        <Route path="/messenger/chat">
          <MessengerListChat friend={friend} />
        </Route>
        <Route path="/messenger/friends">
          <MessengerListFriend friend={friend} />
        </Route>

        <Route path="/messenger/request">
          <MessengerListRequest request={request} />
        </Route>
      </Switch>
    </div>
  )
}
