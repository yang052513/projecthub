import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addNotification, addActivity } from '../../../modules/modules'
import firebase from 'firebase'
import { useFetchProfile } from '../../Hooks/useFetchProfile'
import { useHistory } from 'react-router-dom'
import {
  deleteFriendRequest,
  deleteFriendApplication,
  addFriend,
} from '../../../modules/messenger'

import { Feedback } from '../../Common/Feedback'

interface Props {
  requestUser: any
}

export const MessengerListRequestCard: React.FC<Props> = ({ requestUser }) => {
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)
  const history = useHistory()
  const [feedback, setFeedback] = useState<any>({
    display: false,
    msg: '',
    info: '',
  })

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
    addActivity(
      user.uid,
      `Accepted ${requestUser.FriendProfile.Profile.profileName}'s friend request`,
      'Friend'
    )
    setFeedback({
      display: true,
      msg: 'Added New Friend',
      info: `${requestUser.FriendProfile.Profile.profileName} are your friends now`,
    })
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

    setFeedback({
      display: true,
      msg: 'Delete Request',
      info: `Delete ${requestUser.FriendProfile.Profile.profileName}'s friend request`,
    })
  }

  return (
    <div>
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

      {feedback.display && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="../../images/emoji/emoji_noidea.png"
          toggle={() => history.push('/messenger/friends')}
        />
      )}
    </div>
  )
}
