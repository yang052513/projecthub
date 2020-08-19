import React, { useState, useEffect, useContext } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { MomentCommentItem } from './index'
import { timeFormat } from 'current-time-format'
import { addNotification, addProjectLog } from '../../modules/modules'
import { ProfileContext } from '../../context/ProfileContext'

const { year, monthStrShort, day, hours, minutes } = timeFormat

interface Props {
  docRef: string
  hideComment: () => void
  creatorId: string
}

export const MomentComment: React.FC<Props> = ({
  docRef,
  hideComment,
  creatorId,
}) => {
  const commentRef = firebase
    .firestore()
    .collection('moment')
    .doc(docRef)
    .collection('Comments')

  const user: any = firebase.auth().currentUser
  const profile: any = useContext(ProfileContext)

  const [comments, setComments] = useState<any>([])
  const [commentText, setCommentText] = useState<string>('')

  useEffect(() => {
    const fetchComments = async () => {
      const docs = await commentRef.get()
      docs.forEach((doc: any) => {
        setComments((prevComment: any) => [...prevComment, doc.data()])
      })
    }
    fetchComments()
  }, [])

  const handleInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCommentText(event.target.value as string)
  }

  const sumbitComment = () => {
    commentRef
      .add({
        UserName: profile.profile.profileName,
        UserId: user.uid,
        UserAvatar: profile.avatar,
        CommentBody: commentText,
        CommentDate: `${monthStrShort} ${day}, ${year} ${hours}:${minutes}`,
      })
      .then(commentDoc => {
        commentRef.doc(commentDoc.id).update({
          CommentId: commentDoc.id,
        })
      })
    addNotification(
      creatorId,
      `${profile.profile.profileName} commented your story as ${commentText}`,
      'Story Comment',
      `/moment/${user.uid}`,
      profile.avatar
    )
    addProjectLog(
      creatorId,
      'Social',
      profile.avatar,
      profile.profile.profileName,
      'commented your story',
      commentText
    )
    hideComment()
  }

  const commentList = comments.map((comment: any) => (
    <MomentCommentItem
      key={comment.CommentId}
      userName={comment.UserName}
      userAvatar={comment.UserAvatar}
      commentBody={comment.CommentBody}
      commentDate={comment.CommentDate}
    />
  ))

  return (
    <div>
      <div onClick={hideComment} className="overlay-post"></div>

      <div className="story-comment-container">
        <div className="comment-list-container">
          <h3>Comments</h3>
          {commentList}
          <div className="write-comment-container">
            <input
              type="text"
              onChange={handleInput}
              placeholder="Write your comments..."
            />
            <button onClick={sumbitComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}
