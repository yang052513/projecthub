import React from 'react'
import { MessengerList } from './Messenger/MessengerList'
import { MessengerChat } from './Messenger/MessengerChat'
import { MessengerPanel } from './Messenger/MessengerPanel'

export const Messenger: React.FC = () => {
  return (
    <div className="messenger-container">
      <MessengerPanel />
      <MessengerList />
      <MessengerChat />
    </div>
  )
}
