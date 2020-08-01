import React from 'react'
import { addNotification } from '../../../modules/modules'
import firebase from 'firebase'
import { useFetchProfile } from '../../Hooks/useFetchProfile'
import {
  deleteFriendRequest,
  deleteFriendApplication,
  addFriend,
} from '../../../modules/messenger'

interface Props {
  requestUser: any
}

export const MessengerListRequestCard: React.FC<Props> = ({ requestUser }) => {
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  // 接受好友申请 并互相写入双方的个人信息
  const handleAccept = () => {
    const userData = {
      FriendKey: user.uid,
      FriendProfile: {
        Avatar: profile.avatar,
        Profile: profile.profile,
      },
    }
    // 申请用户requestUser写入通知 Don
    addNotification(
      requestUser.FriendKey,
      `${profile.profile.profileName} are now your friends, chat now`,
      'Friend Request Approved',
      '/messenger/friends',
      profile.avatar
    )

    deleteFriendRequest(user.uid, requestUser.FriendKey)
    deleteFriendApplication(requestUser.FriendKey, user.uid)
    addFriend(user.uid, requestUser.FriendKey, requestUser)
    addFriend(requestUser.FriendKey, user.uid, userData)
  }

  // 删除用户的申请 并不再显示该用户在申请列表
  const handleDelete = () => {
    deleteFriendApplication(requestUser.FriendKey, user.uid)
    deleteFriendRequest(user.uid, requestUser.FriendKey)

    addNotification(
      requestUser.FriendKey,
      `${profile.profile.profileName} rejected your friend request`,
      'Friend Request Update',
      '/messenger',
      profile.avatar
    )
  }

  return (
    <div className="messenger-list-request-item">
      <div className="messenger-list-request-profile">
        <img src={requestUser.FriendProfile.Avatar} alt="" />
        <div>
          <h4>{requestUser.FriendProfile.Profile.profileName}</h4>
          <p>
            <i className="fas fa-map-pin"></i>
            {requestUser.FriendProfile.Profile.profileLocation}
          </p>
        </div>
      </div>

      <div className="messenger-list-request-button">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}
