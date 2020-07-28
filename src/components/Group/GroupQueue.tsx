import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { GroupQueueItem } from './GroupQueueItem'
import { ProjectCard } from '../Home/ProjectCard'

interface Props {
  queueData: any
  queueRef: any
  contributorList: any
  capacity: any
}

export const GroupQueue: React.FC<Props> = ({
  queueData,
  queueRef,
  contributorList,
  capacity,
}) => {
  const [team, setTeam] = useState<any>([])

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

  const handleAccept = (userRef: any) => {
    let updatedList = contributorList
    updatedList[updatedList.length - capacity] = {
      Avatar: userRef.profile.avatar,
      Id: userRef.Key,
    }

    // 删除
    firebase
      .firestore()
      .collection('group')
      .doc(queueRef)
      .collection('Requests')
      .doc(userRef.Key)
      .delete()
      .then(() => {
        console.log('从公共项目列表中接受请求 并删除用户的requests')
      })

    firebase
      .firestore()
      .collection('group')
      .doc(queueRef)
      .update({
        Contributors: updatedList,
        Capacity: capacity - 1,
      })

    firebase
      .firestore()
      .collection('user')
      .doc(userRef.Key)
      .collection('Application')
      .doc(queueRef)
      .update({
        Result: 'Accepted',
      })
  }

  //从Application和Request中删除
  const handleDelete = (userRef: any) => {
    firebase
      .firestore()
      .collection('group')
      .doc(queueRef)
      .collection('Requests')
      .doc(userRef.Key)
      .delete()
    firebase
      .firestore()
      .collection('user')
      .doc(userRef.Key)
      .collection('Application')
      .doc(queueRef)
      .update({
        Result: 'Rejected',
      })
    console.log(queueRef)
  }

  //用户已经加入了队伍 要把contributor里改为None 然后Application中改为rejected
  const handleDeleteContributor = (contributorKey: any) => {
    let updated_contributorList = contributorList
    updated_contributorList.forEach(
      (contributor: any, index: string | number) => {
        if (contributor.Id === contributorKey) {
          updated_contributorList[index] = { Avatar: 'None', Id: 'None' }
        }
      }
    )

    console.log(updated_contributorList)
    //   // 更新contributor list
    // firebase.firestore().collection('group').doc(queueRef).update({
    //   Contributor: updated_contributorList
    // })

    // // 从该用户的application中改为rejected
    // firebase.firestore().collection('user').doc(contributorKey).collection('Application').doc(queueRef).update({
    //   Result: 'Rejected'
    // })
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
      userRef={queue.Key}
      avatar={queue.profile.avatar}
      username={queue.profile.profile.profileName}
      email={queue.profile.profile.profileEmail}
      github={queue.profile.profile.profileGithub}
      handleDelete={() => handleDeleteContributor(queue.Key)}
      handleAccept={() => handleAccept(queue)}
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
      <div className="group-queue-team-status-container">{teamStatusList}</div>
    </div>
  )
}
