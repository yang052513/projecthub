import React from 'react'
import { MessengerList } from './Messenger/MessengerList'
import { MessengerChat } from './Messenger/MessengerChat'

export const Messenger: React.FC = () => {
  return (
    <div className="messenger-container">
      <MessengerList />
      <MessengerChat />
    </div>
  )
}
