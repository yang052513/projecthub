import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StorySocial } from './StorySocial'
import { StoryComment } from './StoryComment'
import firebase, { firestore } from 'firebase'

interface Props {
  avatar: string
  name: string
  time: string
  content: string
  picture: string | null | any
  docRef: string
  userId: string
  currUserProfile: any
}

export const StoryCard: React.FC<Props> = ({
  docRef,
  avatar,
  name,
  time,
  content,
  picture,
  userId,
  currUserProfile,
}) => {
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser

  const [likeCnt, setLikeCnt] = useState<number>()
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const [commentCnt, setCommentCnt] = useState<number>()
  const [showComment, setShowComment] = useState<boolean>(false)

  const fetchLike = () => {
    firebase
      .firestore()
      .collection('moment')
      .doc(docRef)
      .collection('Likes')
      .get()
      .then(docs => {
        setLikeCnt(docs.size)
        docs.forEach(doc => {
          if (doc.data().Key === user.uid) {
            setHasLiked(true)
          }
        })
      })
  }

  useEffect(fetchLike, [])

  const hideComment = () => {
    setShowComment(false)
  }

  useEffect(() => {
    db.collection('moment')
      .doc(docRef)
      .collection('Comments')
      .get()
      .then(docs => {
        setCommentCnt(docs.size)
      })
  }, [db, docRef])

  const handleLike = () => {
    firebase
      .firestore()
      .collection('moment')
      .doc(docRef)
      .collection('Likes')
      .doc(user.uid)
      .set({
        Key: user.uid,
        Avatar: currUserProfile.avatar,
      })
    console.log(`用户${user.uid}赞了${docRef}`)
  }

  return (
    <div>
      <div className="moment-story-card-container">
        <Link to={`/friends/${userId}`}>
          <img className="moment-story-user" src={avatar} alt="" />
        </Link>

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
            hasLiked={hasLiked}
            handleLike={handleLike}
            displayComment={() => setShowComment(true)}
          />
        </div>
      </div>

      {showComment && (
        <StoryComment docRef={docRef} hideComment={hideComment} />
      )}
    </div>
  )
}
