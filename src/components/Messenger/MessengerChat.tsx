import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { timeFormat } from 'current-time-format'
import { useFetchProfile } from '../Hooks/useFetchProfile'
import { sendMessage } from '../../modules/messenger'
import { MessengerChatItem } from './MessengerChatItem'

const { monthNum, day, hours, minutes } = timeFormat
const currentDay = `${hours}:${minutes} on ${monthNum}/${day}`

export const MessengerChat: React.FC = () => {
  const params: any = useParams()
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)
  const [chatMsg, setChatMsg] = useState<string>('')

  const [chat, setChat] = useState<any>([])

  const fetchChat = () => {
    setChat([])
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .doc(params.ref)
      .collection('Chat')
      .onSnapshot(snap => {
        snap.docChanges().forEach(change => {
          if (change.type == 'added') {
            setChat((prevChat: any) => [...prevChat, change.doc.data()])
          }
        })
      })
  }
  useEffect(fetchChat, [params.ref])

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
    setChatMsg('')
  }

  const chatList = chat.map((chatItem: any) => (
    <MessengerChatItem key={chatItem.ChatKey} chatItem={chatItem} />
  ))

  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>Nathan Lee</p>
      </div>

      {/* 聊天内容展示 */}
      <div className="messenger-chat-display-container">{chatList}</div>

      {/* 发布信息区域 */}
      <div className="messenger-chat-tools-container">
        <i className="far fa-laugh"></i>
        <i className="far fa-image"></i>
        <i className="fas fa-link"></i>
      </div>
      <div className="messenger-chat-box-container">
        <textarea
          value={chatMsg}
          onChange={handleMsg}
          placeholder="Type Message..."
        ></textarea>
        <button onClick={submitMsg}>Send</button>
      </div>
    </div>
  )
}
