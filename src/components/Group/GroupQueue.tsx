import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { GroupQueueItem } from './GroupQueueItem'
import { Feedback } from '../shared/Feedback'
import { Progress } from '../shared/Progress'

// Modules
import { addNotification } from '../../modules/modules'
import { updateApplication, deleteRequest } from '../../modules/group'
import { group } from 'console'
import { CSSTransition } from 'react-transition-group'

interface Props {
  queueData: any
  queueRef: any
  contributorList: any
  capacity: any
  groupData: any
}

export const GroupQueue: React.FC<Props> = ({
  queueData,
  queueRef,
  contributorList,
  capacity,
  groupData,
}) => {
  const [team, setTeam] = useState<any>([])
  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })
  const [progress, setProgress] = useState<boolean>(false)

  const handleReload = () => {
    window.location.reload()
  }

  const fetchContributorProfile = () => {
    contributorList.forEach((contributor: any, index: any) => {
      if (contributor.Id !== 'None' && index > 0) {
        firebase
          .firestore()
          .collection('user')
          .doc(contributor.Id)
          .collection('Setting')
          .doc('Profile')
          .get()
          .then(doc => {
            let profile: any = doc.data()
            const profileData = {
              Key: contributor.Id,
              profile: profile,
            }
            setTeam((prevTeam: any) => [...prevTeam, profileData])
          })
      }
    })
  }

  useEffect(fetchContributorProfile, [])

  // 同意用户加入项目团队的申请
  const handleAccept = (userRef: any) => {
    setProgress(true)
    setTimeout(() => {
      let updatedList = contributorList
      updatedList[updatedList.length - capacity] = {
        Avatar: userRef.profile.avatar,
        Id: userRef.Key,
      }

      // 更新group该项目文档的贡献者列表 以及空缺位子
      firebase
        .firestore()
        .collection('group')
        .doc(queueRef)
        .update({
          Contributors: updatedList,
          Capacity: capacity - 1,
        })

      // 从请求集合中删除
      deleteRequest(queueRef, userRef.Key)
      // 更新被接受用户的申请状态
      updateApplication(userRef.Key, queueRef, 'Accepted')
      // 通知用户
      addNotification(
        userRef.Key,
        `Your application for ${groupData.Name} has been accepted`,
        'Project Contributor Request',
        '/grouppost',
        groupData.Creator.Avatar
      )

      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Added Successfully',
        info: `${userRef.profile.profile.profileName} has been added to your team`,
      })
    }, 1000)
  }

  //queueList 从Application和Request中删除
  const handleDelete = (userRef: any) => {
    setProgress(true)
    setTimeout(() => {
      deleteRequest(queueRef, userRef.Key)
      updateApplication(userRef.Key, queueRef, 'Rejected')
      addNotification(
        userRef.Key,
        `Your request for project ${groupData.Name} has been rejected`,
        'Project Request',
        '/grouppost',
        groupData.Creator.Avatar
      )

      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Delete Success',
        info: 'Delete user from your team successfully',
      })
      console.log(`用户${userRef.Key}的请求以被拒绝`)
    }, 1000)
  }

  //teamList: 用户已经加入了队伍 要把contributor里改为None 然后Application中改为rejected
  const handleDeleteContributor = (contributorKey: any) => {
    setProgress(true)
    setTimeout(() => {
      let updated_contributorList = contributorList
      updated_contributorList.forEach(
        (contributor: any, index: string | number) => {
          if (contributor.Id === contributorKey) {
            updated_contributorList[index] = { Avatar: 'None', Id: 'None' }
          }
        }
      )
      // 更新contributor list
      firebase
        .firestore()
        .collection('group')
        .doc(queueRef)
        .update({
          Contributors: updated_contributorList,
          Capacity: capacity + 1,
        })

      updateApplication(contributorKey, queueRef, 'Rejected')
      addNotification(
        contributorKey,
        `You has been removed from ${groupData.Name}`,
        'Project Contributor Request',
        '/grouppost',
        groupData.Creator.Avatar
      )

      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Delete Success',
        info: 'Delete user from your team successfully',
      })
      console.log('从Team中删除用户成功')
    }, 1000)
  }

  const queueList = queueData.map((queue: any) => (
    <GroupQueueItem
      key={queue.Key}
      userRef={queue.Key}
      avatar={queue.profile.avatar}
      username={queue.profile.profile.profileName}
      email={queue.profile.profile.profileEmail}
      github={queue.profile.profile.profileGithub}
      handleDelete={() => handleDelete(queue)}
      handleAccept={() => handleAccept(queue)}
    />
  ))

  const teamList = team.map((queue: any) => (
    <GroupQueueItem
      key={queue.Key}
      isTeam={true}
      userRef={queue.Key}
      avatar={queue.profile.avatar}
      username={queue.profile.profile.profileName}
      email={queue.profile.profile.profileEmail}
      github={queue.profile.profile.profileGithub}
      handleDelete={() => handleDeleteContributor(queue.Key)}
    />
  ))

  const teamStatusList = contributorList.map((contributor: any, index: any) => {
    if (contributor.Id !== 'None') {
      if (index === 0) {
        return (
          <div key={contributor.Id} className="group-queue-contributor">
            <img src={contributor.Avatar} alt="" />
            <p className="group-list-result">Owner</p>
          </div>
        )
      }

      return (
        <div key={contributor.Id} className="group-queue-contributor">
          <img src={contributor.Avatar} alt="" />
          <p className="group-list-result">Contributor</p>
        </div>
      )
    }
  })

  return (
    <div>
      <div className="group-queue-container">
        <h3>People Who Applied</h3>
        {queueList.length > 0 ? (
          queueList
        ) : (
          <p className="group-no-result">No one applied yet</p>
        )}

        <h3>Team List</h3>
        {teamList.length > 0 ? (
          teamList
        ) : (
          <p className="group-no-result">No one in your team right now</p>
        )}

        <h3>Team Status</h3>
        <div className="group-queue-team-status-container">
          {teamStatusList}
        </div>
      </div>

      {progress && <Progress />}

      <CSSTransition
        in={feedback.show}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_happy.png"
          toggle={handleReload}
        />
      </CSSTransition>
    </div>
  )
}
