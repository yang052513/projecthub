import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { useFetchProfile } from './Hooks/useFetchProfile'
import { GroupDetailCard } from './Group/GroupDetailCard'

import { Feedback } from './Common/Feedback'
import { Loading } from './Common/Loading'
import { timeFormat } from 'current-time-format'

import { addNotification } from '../modules/modules'
import { CSSTransition } from 'react-transition-group'
import { GroupSort } from './Group/Form/GroupSort'

export const Group: React.FC = () => {
  const [project, setProject] = useState<Array<object | null | undefined>>([])
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const { monthStrLong, day, hours, minutes } = timeFormat

  const currentDay = `${monthStrLong} ${day} at ${hours}:${minutes}`

  //排序 过滤控制
  const [selector, setSelector] = useState({
    search: ' ',
    category: ' ',
    team: ' ',
    duration: ' ',
  })

  const handleSelector = (event: any) => {
    setSelector({
      ...selector,
      [event.target.name]: event.target.value,
    })
  }

  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })

  const [loading, setLoading] = useState<boolean>(true)

  const fetchGroup = () => {
    firebase
      .firestore()
      .collection('group')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setProject(prevProject => [...prevProject, doc.data()])
        })
        setLoading(false)
      })
  }

  useEffect(fetchGroup, [])

  const submitApply = (docKey: string, creatorId: string, projectData: any) => {
    const requestRef = firebase.firestore().collection('group').doc(docKey)
    const contributorRef = firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Application')
      .doc(docKey)

    requestRef
      .collection('Requests')
      .doc(user.uid)
      .get()
      .then(reqDoc => {
        // If user already applied the project -> Error Modal -> Direct to Dashboard
        if (reqDoc.exists) {
          setFeedback({
            show: true,
            msg: 'Application Repeated',
            info: `You have already applied this project, please check your application history by clicking My Request button`,
          })
        } else {
          requestRef.collection('Requests').doc(user.uid).set({
            Key: user.uid,
            profile,
          })

          addNotification(
            creatorId,
            `${profile.profile.profileName} applied your project ${projectData.Name}`,
            'Project Contributor Request',
            '/grouppost',
            profile.avatar
          )

          // Write to current user's application collection
          requestRef.get().then((doc: any) =>
            contributorRef.set({
              Key: doc.data().Key,
              Creator: {
                Avatar: doc.data().Creator.Avatar,
                Id: doc.data().Creator.Id,
              },
              Result: 'Applied',
            })
          )

          setFeedback({
            show: true,
            msg: 'Application Success',
            info: 'Please wait the project owner response to your application',
          })
        }
      })
  }

  const handleApply = (creatorId: string, projectData: any) => {
    // If the creator trying to apply his project -> Error Modal
    if (user.uid === creatorId) {
      setFeedback({
        show: true,
        msg: 'Application Failed',
        info: 'You can not apply the project you created.',
      })
    } else {
      submitApply(projectData.Key, creatorId, projectData)
    }
  }

  const projectList = project
    .filter((item: any) => {
      if (selector.search !== ' ') {
        return item.Name.includes(selector.search)
      } else {
        return item
      }
    })
    .filter((item: any) => {
      if (selector.category !== ' ') {
        return item.Category === selector.category
      } else {
        return item
      }
    })
    .filter((item: any) => {
      if (selector.team !== ' ') {
        return item.Contributors.length >= selector.team
      } else {
        return item
      }
    })
    .filter((item: any) => {
      const timeDiff = Date.parse(item.EndDate) - Date.parse(item.StartDate)
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

      if (selector.duration !== ' ') {
        if (selector.duration === '0') {
          return daysDiff < 7
        } else if (selector.duration === '1') {
          return daysDiff >= 7 && daysDiff < 28
        } else if (selector.duration === '2') {
          return daysDiff >= 28 && daysDiff < 90
        } else {
          return daysDiff >= 90
        }
      } else {
        return item
      }
    })
    .map((item: any) => (
      <GroupDetailCard
        key={item.Key}
        cardData={item}
        handleApply={() => handleApply(item.Creator.Id, item)}
      />
    ))

  return (
    <div className="group-container component-layout">
      {loading && <Loading />}

      <CSSTransition
        in={!loading}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div>
          <div className="group-header-container">
            <h2>Find Your Teams</h2>
            <p>
              Looking for some teammates to start your projects? Create a
              request and let other contributors to join.
            </p>
          </div>

          <div className="group-filter-container">
            <input
              name="search"
              onChange={handleSelector}
              className="group-search"
              type="text"
              placeholder="Search by title..."
            />

            <div className="group-filter-wrap">
              <GroupSort selector={selector} handleSelector={handleSelector} />
              <Link to="/request">
                <button>Create A Request</button>
              </Link>
              <Link to="/grouppost">
                <button>My Request</button>
              </Link>
            </div>
          </div>

          <div className="group-project-list-container">{projectList}</div>
        </div>
      </CSSTransition>

      {feedback.show && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_scare.png"
          toggle={() => {
            setFeedback({
              show: false,
              info: '',
              msg: '',
            })
          }}
        />
      )}
    </div>
  )
}
