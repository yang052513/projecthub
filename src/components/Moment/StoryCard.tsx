import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StorySocial } from './StorySocial'
import { StoryComment } from './StoryComment'
import firebase from 'firebase'
import { addNotification } from '../../modules/modules'
import { MomentMenu } from '../Moment/MomentMenu'

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
    if (docRef) {
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
  }
  useEffect(fetchLike, [hasLiked])

  const hideComment = () => {
    setShowComment(false)
  }

  useEffect(() => {
    if (docRef) {
      db.collection('moment')
        .doc(docRef)
        .collection('Comments')
        .get()
        .then(docs => {
          setCommentCnt(docs.size)
        })
    }
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
    setHasLiked(true)
    if (userId !== user.uid) {
      addNotification(
        userId,
        `${currUserProfile.profile.profileName} liked your story`,
        'Story Like',
        `/moemnt/${userId}`,
        currUserProfile.avatar
      )
    }
  }

  const handleDislike = () => {
    firebase
      .firestore()
      .collection('moment')
      .doc(docRef)
      .collection('Likes')
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log('取消对这个动态的赞')
      })
    setHasLiked(false)
  }

  const handleDelete = () => {
    firebase
      .firestore()
      .collection('moment')
      .doc(docRef)
      .delete()
      .then(() => {
        console.log('动态删除成功')
      })
  }

  return (
    <div>
      <div className="moment-story-card-container">
        <Link to={`/friends/${userId}`}>
          <img className="moment-story-user" src={avatar} alt="" />
        </Link>

        <div>
          <p className="moment-story-name">
            <Link to={`/moment/${userId}`}>{name}</Link>
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
            handleDislike={handleDislike}
            displayComment={() => setShowComment(true)}
          />
          {user.uid === userId && <MomentMenu handleDelete={handleDelete} />}
        </div>
      </div>

      {showComment && (
        <StoryComment
          docRef={docRef}
          creatorId={userId}
          hideComment={hideComment}
        />
      )}
    </div>
  )
}
