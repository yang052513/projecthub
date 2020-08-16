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

      {requestList.length > 0 ? (
        requestList
      ) : (
        <div className="messenger-noresult">
          <p>暂无好友申请</p>
        </div>
      )}
    </div>
  )
}
