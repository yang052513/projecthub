import React, { useState, useEffect, useContext } from 'react'
import { MomentEditor, MomentCard } from './index'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { Loading } from '../shared/Loading'
import { CSSTransition } from 'react-transition-group'
import { ProfileContext } from '../../context/ProfileContext'

export const Moment = () => {
  const profile: any = useContext(ProfileContext)

  const [moment, setMoment] = useState<Array<object | null | undefined>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editor, setEditor] = useState<boolean>(false)

  // 加载所有动态
  useEffect(() => {
    const fetchMoment = async () => {
      const momentDocs = await firebase
        .firestore()
        .collection('moment')
        .orderBy('Time', 'desc')
        .get()
      momentDocs.forEach(doc => {
        setMoment(prevMoment => [...prevMoment, doc.data()])
      })
      setLoading(false)
    }
    fetchMoment()
  }, [])

  // 渲染所有动态
  const momentList = moment
    .sort((a: any, b: any) => {
      return a.Time.split(' on ')[1] < b.Time.split(' on ')[1] ? 1 : -1
    })
    .map((moment: any) => (
      <MomentCard key={moment.Key} profile={profile} moment={moment} />
    ))

  return (
    <div className="component-layout moment-container">
      {loading && <Loading />}

      <CSSTransition
        in={!loading}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="moment-story-card-wrap">{momentList}</div>
      </CSSTransition>

      {/* 编辑一个新的动态按钮 */}
      <div className="post-moment-container">
        <i onClick={() => setEditor(true)} className="fas fa-feather"></i>
      </div>

      {/* Display the moment editor container */}
      <CSSTransition
        in={editor}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <MomentEditor
          profile={profile.profile}
          avatar={profile.avatar}
          toggle={() => setEditor(false)}
        />
      </CSSTransition>
    </div>
  )
}
