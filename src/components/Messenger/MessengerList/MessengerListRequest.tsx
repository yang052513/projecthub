import React from 'react'
import { MessengerListRequestCard } from './MessengerListRequestCard'

interface Props {
  request: any
}

export const MessengerListRequest: React.FC<Props> = ({ request }) => {
  const requestList = request.map((item: any) => (
    <MessengerListRequestCard key={item.FriendKey} requestUser={item} />
  ))

  return (
    <div className="messenger-list-request-container">
      <div className="messenger-list-header">
        <p>FRIENDS REQUEST</p>
      </div>

      {requestList}
    </div>
  )
}
