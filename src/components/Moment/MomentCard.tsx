import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MomentStatistics, MomentComment, MomentMenu } from './index'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { addNotification, addProjectLog } from '../../modules/modules'
import { Feedback } from '../shared/Feedback'
import { CSSTransition } from 'react-transition-group'

interface Props {
  profile: any
  moment: any
}

export const MomentCard: React.FC<Props> = ({ profile, moment }) => {
  const user: any = firebase.auth().currentUser
  const momentRef = firebase.firestore().collection('moment').doc(moment.Key)

  const [like, setLike] = useState<number>(0)
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const [comment, setComment] = useState<{ count: number; display: boolean }>({
    count: 0,
    display: false,
  })
  const [feedback, setFeedback] = useState<{
    display: boolean
    msg: string
    info: string
  }>({
    display: false,
    msg: '',
    info: '',
  })

  // 读取赞
  useEffect(() => {
    const fetchLike = async () => {
      const docs = await momentRef.collection('Likes').get()
      setLike(docs.size)

      docs.forEach(doc => {
        if (doc.data().Key === user.uid) {
          setHasLiked(true)
        }
      })
    }
    fetchLike()
  }, [hasLiked])

  // 读取评论
  useEffect(() => {
    const fetchComment = async () => {
      const docs = await momentRef.collection('Comments').get()
      setComment({ ...comment, count: docs.size })
    }
    fetchComment()
  }, [])

  // 赞动态
  const handleLike = () => {
    momentRef.collection('Likes').doc(user.uid).set({
      Key: user.uid,
      Avatar: profile.avatar,
    })

    setHasLiked(true)
    if (moment.UserId !== user.uid) {
      addNotification(
        moment.UserId,
        `${profile.profile.profileName} liked your story`,
        'Story Like',
        `/moemnt/${moment.UserId}`,
        profile.avatar
      )
      addProjectLog(
        moment.UserId,
        'Social',
        profile.avatar,
        profile.profile.profileName,
        'liked your story',
        moment.Content
      )
    }
  }

  // 取消对动态的赞
  const handleDislike = () => {
    momentRef
      .collection('Likes')
      .doc(user.uid)
      .delete()
      .then(() => {})
    setHasLiked(false)
  }

  const handleDelete = () => {
    momentRef.delete().then(() => {
      setFeedback({
        display: true,
        msg: 'Moment deleted',
        info: 'Moment has been deleted from your post',
      })
    })
  }

  return (
    <div>
      <div className="moment-story-card-container">
        <Link to={`/friends/${moment.UserId}`}>
          <img className="moment-story-user" src={moment.Avatar} alt="" />
        </Link>

        <div>
          <p className="moment-story-name">
            <Link to={`/moment/${moment.UserId}`}>{moment.Author}</Link>
            <span className="moment-story-time"> @{moment.Time}</span>
          </p>
          <p className="moment-story-content">{moment.Content}</p>
          {moment.Picture !== '' && (
            <img className="moment-story-image" src={moment.Picture} alt="" />
          )}
          <MomentStatistics
            comment={comment.count}
            like={like}
            hasLiked={hasLiked}
            handleLike={handleLike}
            handleDislike={handleDislike}
            displayComment={() => setComment({ ...comment, display: true })}
          />

          {/* 如果该动态属于当前认证用户 可编辑按钮 */}
          {user.uid === moment.UserId && (
            <MomentMenu handleDelete={handleDelete} />
          )}
        </div>
      </div>

      {/* 评论弹窗 */}
      <CSSTransition
        in={comment.display}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <MomentComment
          docRef={moment.Key}
          creatorId={moment.UserId}
          hideComment={() => setComment({ ...comment, display: false })}
        />
      </CSSTransition>

      {/* 反馈信息 */}
      <CSSTransition
        in={feedback.display}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_happy.png"
          toggle={() => window.location.reload()}
        />
      </CSSTransition>
    </div>
  )
}
