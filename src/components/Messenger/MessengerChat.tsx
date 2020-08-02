import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { timeFormat } from 'current-time-format'
import { useFetchProfile } from '../Hooks/useFetchProfile'
import { sendMessage } from '../../modules/messenger'

const { monthNum, day, hours, minutes } = timeFormat
const currentDay = `${hours}:${minutes} on ${monthNum}/${day}`

export const MessengerChat: React.FC = () => {
  const params: any = useParams()
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)
  const [chatMsg, setChatMsg] = useState<string>('')

  const handleMsg = (e: { target: { value: any } }) => {
    setChatMsg(e.target.value)
  }

  const submitMsg = () => {
    const chatData = {
      Avatar: profile.avatar,
      Message: chatMsg,
      Date: currentDay,
      UserRef: user.uid,
    }

    sendMessage(user.uid, params.ref, chatData)
  }

  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>Nathan Lee</p>
      </div>

      {/* 聊天内容展示 */}
      <div className="messenger-chat-display-container">
        <div className="messenger-chat-item chat-receiver">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pinboard-25.appspot.com/o/unnamed.jpg?alt=media&token=16c03822-c35e-4eb2-ac5f-2e7e1e0f98fb"
            alt=""
          />
          <p>
            We're headed to Tahoe this weekend. Something warm would be nice...
          </p>
        </div>

        <div className="messenger-chat-item chat-sender">
          <p>
            We're headed to Tahoe this weekend. Something warm would be nice...
          </p>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pinboard-25.appspot.com/o/unnamed.jpg?alt=media&token=16c03822-c35e-4eb2-ac5f-2e7e1e0f98fb"
            alt=""
          />
        </div>
      </div>

      {/* 发布信息区域 */}
      <div className="messenger-chat-tools-container">
        <i className="far fa-laugh"></i>
        <i className="far fa-image"></i>
        <i className="fas fa-link"></i>
      </div>
      <div className="messenger-chat-box-container">
        <textarea onChange={handleMsg} placeholder="Type Message..."></textarea>
        <button onClick={submitMsg}>Send</button>
      </div>
    </div>
  )
}
