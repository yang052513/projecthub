import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

interface Props {
  comment?: any
  docRef?: string
}

export const StoryComment: React.FC<Props> = ({ comment, docRef }) => {
  const db = firebase.firestore()
  const [avatar, setAvatar] = useState<string>('')

  const [commentText, setCommentText] = useState<string>('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Profile')
        .get()
        .then((doc: any) => {
          setAvatar(doc.data().avatar)
        })
    })

    return () => {
      console.log(avatar)
    }
  }, [])

  const handleInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCommentText(event.target.value as string)
  }

  const sumbitComment = () => {
    firebase.auth().onAuthStateChanged((user: any) => {
      db.collection('moment').doc(docRef).collection('Comments').add({
        UserId: user.uid,
        userAvatar: avatar,
        CommentBody: commentText,
        CommentDate: '2020/07/14',
      })
    })
  }

  return (
    <div className="story-comment-container">
      <h3>Comments</h3>

      <p>Write your comments</p>
      <input type="text" onChange={handleInput} />
      <button onClick={sumbitComment}>Post</button>
    </div>
  )
}
