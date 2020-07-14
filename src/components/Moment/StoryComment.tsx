import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

interface Props {
  comment?: any
  docRef?: string
  hideComment: () => void
}

export const StoryComment: React.FC<Props> = ({
  comment,
  docRef,
  hideComment,
}) => {
  const user: any = firebase.auth().currentUser
  const db = firebase.firestore()
  const [avatar, setAvatar] = useState<string>('')
  const [overlay, setOverlay] = useState<boolean>(true)
  const [commentText, setCommentText] = useState<string>('')

  const [commentList, setCommentList] = useState<any>([])

  const commentRef = db.collection('moment').doc(docRef).collection('Comments')

  useEffect(() => {
    db.collection('user')
      .doc(user.uid)
      .collection('Setting')
      .doc('Profile')
      .get()
      .then((doc: any) => {
        setAvatar(doc.data().avatar)
      })

    commentRef.get().then(docs => {
      docs.forEach(document => {
        setCommentList((prevComment: any) => [...prevComment, document.data()])
      })
    })
  }, [])

  const handleInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCommentText(event.target.value as string)
  }

  const sumbitComment = () => {
    firebase.auth().onAuthStateChanged((user: any) => {
      db.collection('moment')
        .doc(docRef)
        .collection('Comments')
        .add({
          UserId: user.uid,
          userAvatar: avatar,
          CommentBody: commentText,
          CommentDate: '2020/07/14',
        })
        .then(commentRef => {
          db.collection('moment')
            .doc(docRef)
            .collection('Comments')
            .doc(commentRef.id)
            .update({
              CommentId: commentRef.id,
            })
        })
    })
  }

  return (
    <div>
      <div onClick={hideComment} className="overlay-post"></div>
      <div className="story-comment-container">
        <h3>Comments</h3>
        {commentList.map((item: any) => (
          <p key={item.CommentId}>{item.UserId}</p>
        ))}
        <p>Write your comments</p>
        <input type="text" onChange={handleInput} />
        <button onClick={sumbitComment}>Post</button>
      </div>
    </div>
  )
}
