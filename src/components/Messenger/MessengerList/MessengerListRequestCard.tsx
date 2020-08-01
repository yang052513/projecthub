import React from 'react'
import { addNotification } from '../../../modules/modules'
import firebase from 'firebase'
import { useFetchProfile } from '../../Hooks/useFetchProfile'
interface Props {
  requestUser: any
}

export const MessengerListRequestCard: React.FC<Props> = ({ requestUser }) => {
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

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

    // 申请用户删除application
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Notification')
      .collection('Request')
      .doc(requestUser.FriendKey)
      .delete()

    // 当前用户删除request
    firebase
      .firestore()
      .collection('user')
      .doc(requestUser.FriendKey)
      .collection('Friend')
      .doc('Notification')
      .collection('Application')
      .doc(user.uid)
      .delete()

    // 申请用户Added 集合加入 当前用户Added集合加入用户
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .doc(requestUser.FriendKey)
      .set(requestUser)

    firebase
      .firestore()
      .collection('user')
      .doc(requestUser.FriendKey)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .doc(user.uid)
      .set(userData)
  }

  const handleDelete = () => {
    console.log(`删除申请${requestUser}`)
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
