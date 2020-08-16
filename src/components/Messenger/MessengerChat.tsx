import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import firebase, { analytics } from 'firebase'
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

  const [friendUserName, setFriendUserName] = useState<string>('')
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
      .orderBy('Date', 'asc')
      .onSnapshot(snap => {
        snap.docChanges().forEach(change => {
          if (change.type == 'added') {
            setChat((prevChat: any) => [...prevChat, change.doc.data()])
          }
        })
      })

    firebase
      .firestore()
      .collection('user')
      .doc(params.ref)
      .collection('Setting')
      .doc('Profile')
      .get()
      .then((doc: any) => {
        setFriendUserName(doc.data().profile.profileName)
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

    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .doc(params.ref)
      .update({
        LatestNotify: {
          Msg: chatMsg,
          Date: currentDay,
        },
      })
    firebase
      .firestore()
      .collection('user')
      .doc(params.ref)
      .collection('Friend')
      .doc('Added')
      .collection('Friends')
      .doc(user.uid)
      .update({
        LatestNotify: {
          Msg: chatMsg,
          Date: currentDay,
        },
      })
  }

  const handleSubmit = (e: { key: string; shiftKey: any }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (chatMsg !== '') {
        submitMsg()
      } else {
        alert('消息不能为空')
      }
    }
  }

  const chatList = chat
    .sort((a: any, b: any) => {
      return a.Date.split(' on ')[1] < b.Date.split(' on ')[1] ? -1 : 1
    })
    .map((chatItem: any, index: any) => (
      <MessengerChatItem key={chatItem.ChatKey} chatItem={chatItem} />
    ))

  return (
    <div className="messenger-chat-container">
      <div className="messenger-chat-header">
        <p>{friendUserName}</p>
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
          onKeyPress={handleSubmit}
        ></textarea>
      </div>
    </div>
  )
}
