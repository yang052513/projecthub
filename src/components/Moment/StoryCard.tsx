import React, { useState, useEffect } from 'react'
import { StorySocial } from './StorySocial'
import { StoryComment } from './StoryComment'
import firebase from 'firebase'

interface Props {
  avatar: string
  name: string
  time: string
  content: string
  picture: string | null | any
  like: number
  docRef: string
  userId: string
}

export const StoryCard: React.FC<Props> = ({
  docRef,
  avatar,
  name,
  time,
  content,
  picture,
  like,
}) => {
  const db = firebase.firestore()
  const [likeCnt, setLikeCnt] = useState<number>(like)
  const [commentCnt, setCommentCnt] = useState<number>()
  const [showComment, setShowComment] = useState<boolean>(false)

  const likePost = () => {
    setLikeCnt(prevState => prevState + 1)
  }

  const hideComment = () => {
    setShowComment(false)
  }

  useEffect(() => {
    db.collection('moment').doc(docRef).update({
      Like: likeCnt,
    })
  }, [likeCnt, db, docRef])

  useEffect(() => {
    db.collection('moment')
      .doc(docRef)
      .collection('Comments')
      .get()
      .then(docs => {
        setCommentCnt(docs.size)
      })
  }, [db, docRef])

  return (
    <div>
      <div className="moment-story-card-container">
        <img className="moment-story-user" src={avatar} alt="" />
        <div>
          <p className="moment-story-name">
            {name}
            <span className="moment-story-time"> @{time}</span>
          </p>
          <p className="moment-story-content">{content}</p>
          {picture === '' ? null : (
            <img className="moment-story-image" src={picture} alt="" />
          )}
          <StorySocial
            comment={commentCnt}
            like={likeCnt}
            likePost={likePost}
            displayComment={() => setShowComment(true)}
          />
        </div>
      </div>
      {showComment ? (
        <StoryComment docRef={docRef} hideComment={hideComment} />
      ) : null}
    </div>
  )
}
