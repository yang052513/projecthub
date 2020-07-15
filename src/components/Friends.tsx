import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { FriendCard } from './Friends/FriendCard'

export const Friends: React.FC = () => {
  const [user, setUser] = useState<Array<object | null | undefined>>([])
  const db = firebase.firestore()

  useEffect(() => {
    db.collection('friends')
      .get()
      .then(friendQuery => {
        friendQuery.forEach(doc => {
          setUser(prevUser => [...prevUser, doc.data()])
        })
      })
    return () => {
      console.log('friends')
    }
  }, [db])

  const userList = user.map((user: any) => (
    <FriendCard
      key={user.Key}
      userId={user.Key}
      avatar={user.avatar}
      info={user.profile}
    />
  ))

  return (
    <div className="component-layout">
      <ul>
        <li>交友系统</li>
        <li>所有用户显示 根据profile有的信息</li>
        <li>sort排序</li>
        <li>添加好友</li>
      </ul>
      {userList}
    </div>
  )
}
