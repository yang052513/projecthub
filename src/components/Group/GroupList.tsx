import React, { useState } from 'react'
import firebase from 'firebase'
import { GroupQueue } from './GroupQueue'
import { GroupMenu } from './GroupMenu'
import { Feedback } from '../shared/Feedback'
import { Progress } from '../shared/Progress'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useHistory } from 'react-router-dom'

import {
  deleteApplication,
  deleteRequest,
  updateApplication,
} from '../../modules/group'
import { addNotification, addProjectLog } from '../../modules/modules'
import { useFetchProfile } from '../../hooks/useFetchProfile'
import { CSSTransition } from 'react-transition-group'

//Table Styling
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#03a9f4',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow)

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
  },
})

interface Props {
  tableData: any
}

const date = new Date()
const currentMonth: any =
  date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()

export const GroupList: React.FC<Props> = ({ tableData }) => {
  const classes = useStyles()
  const history = useHistory()
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
    imgUrl: '',
    toggle: '',
    confirm: false,
    cancel: '',
  })

  const [groupData, setGroupData] = useState<any>()
  const [progress, setProgress] = useState<boolean>(false)

  const [queueKey, setQueueKey] = useState<string>()
  const [display, setDisplay] = useState<boolean>(false)

  const [contributor, setContributor] = useState<Array<Object>>([])
  const [capacity, setCapacity] = useState<number>()
  const [queue, setQueue] = useState<any>({
    groupRef: '',
    creatorRef: '',
    data: [],
  })

  const toggleReload = () => {
    window.location.reload()
  }

  const toggleHomeDirect = () => {
    history.push('/')
  }

  const toggleClose = () => {
    setFeedback((prevState: any) => ({
      ...prevState,
      show: false,
      confirm: false,
    }))
  }

  // Write project data to each contributor's Project collection 项目创建人创建项目 -> 写入到每个已加入队员的Project集合中
  const toggleCreate = (projectData: any) => {
    setProgress(true)
    setTimeout(() => {
      // Delete Empty Contributor 删除空缺的位子
      let contributorList: any = [
        { Id: projectData.Creator.Id, Avatar: projectData.Creator.Avatar },
      ]
      projectData.Contributors.forEach((contributor: any, index: any) => {
        if (contributor.Id !== 'None' && index > 0) {
          contributorList.push(contributor)

          updateApplication(contributor.Id, projectData.Key, 'Created')

          addNotification(
            contributor.Id,
            `Project ${projectData.Name} has been created and added to your dashboard`,
            'Project Status',
            '/',
            projectData.Creator.Avatar
          )
        }
      })

      //删除未处理的用户请求为Unavailable
      firebase
        .firestore()
        .collection('group')
        .doc(projectData.Key)
        .collection('Requests')
        .get()
        .then(requestDocs => {
          if (requestDocs.docs.length > 0) {
            requestDocs.forEach(doc => {
              updateApplication(doc.data().Key, groupData.Key, 'Unavailable')
              deleteRequest(groupData.Key, doc.data().Key)
            })
          }
        })

      //声明 项目信息
      const projectDoc = {
        Key: projectData.Key,
        Creator: projectData.Creator,
        Public: true,
        Like: 0,
        Privacy: 'Public',
        Name: projectData.Name,
        Status: 'In Progress',
        Category: projectData.Category,
        Description: projectData.Description,
        StartDate: projectData.StartDate,
        EndDate: projectData.EndDate,
        Tools: projectData.Tools,
        Contributors: contributorList,
      }

      // 写入到每个用户的Project的集合中
      contributorList.forEach((contributor: any) => {
        let subjectName =
          contributor.Id === user.uid ? 'You' : profile.profile.profileName

        firebase
          .firestore()
          .collection('user')
          .doc(contributor.Id)
          .collection('Statistics')
          .doc(currentMonth)
          .update({
            'In Progress': firebase.firestore.FieldValue.increment(1),
          })

        firebase
          .firestore()
          .collection('user')
          .doc(contributor.Id)
          .collection('Project')
          .doc(projectData.Key)
          .set(projectDoc)

        addProjectLog(
          contributor.Id,
          'Activity',
          contributor.Avatar,
          subjectName,
          'created the team project',
          projectData.Name
        )
      })

      // Delete from group project docs
      firebase.firestore().collection('group').doc(projectData.Key).delete()

      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Create Success',
        info: 'Project created successfully, please check your dashboard',
        imgUrl: '/images/emoji/emoji_happy.png',
        toggle: toggleHomeDirect,
      })
      console.log('项目创建成功')
    }, 1000)
  }

  // Display people who applied, people who already in the team
  const displayQueue = (
    queueRef: string,
    creatorRef: string,
    contributorList: Array<Object>,
    capacityNum: number,
    groupDoc: any
  ) => {
    setDisplay(true)
    setContributor(contributorList)
    setCapacity(capacityNum)
    setQueueKey(queueRef)
    setGroupData(groupDoc)
    firebase
      .firestore()
      .collection('group')
      .doc(queueRef)
      .collection('Requests')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          setQueue((prevState: any) => ({
            groupRef: queueRef,
            creatorRef: creatorRef,
            data: [...prevState.data, doc.data()],
          }))
        })
      })
  }

  // Delete the posts from 'group' and 'Application' database
  // 项目创建人删除该项目 -> 从group集合 以及申请用户的Application集合中删除项目文档
  const handleDelete = (groupData: any) => {
    setProgress(true)
    setTimeout(() => {
      // Delete Request docs 删除还处于申请状态的用户
      firebase
        .firestore()
        .collection('group')
        .doc(groupData.Key)
        .collection('Requests')
        .get()
        .then(requestDocs => {
          if (requestDocs.docs.length > 0) {
            requestDocs.forEach(doc => {
              updateApplication(doc.data().Key, groupData.Key, 'Deleted')
              deleteRequest(groupData.Key, doc.data().Key)
            })
          }
        })

      // Delete from user Application collection 删除已经加入的用户
      groupData.Contributors.forEach(
        (contributor: { Id: string; Avatar: string }, index: number) => {
          if (contributor.Id !== 'None' && index > 0) {
            updateApplication(contributor.Id, groupData.Key, 'Deleted')
            addNotification(
              contributor.Id,
              `${groupData.Name} has been deleted by the creator`,
              'Project Status',
              '/grouppost',
              groupData.Creator.Avatar
            )
            addProjectLog(
              contributor.Id,
              'Activity',
              contributor.Avatar,
              'The Project Owner',
              'deleted team project',
              groupData.Name
            )
          }
        }
      )

      addProjectLog(
        groupData.Creator.Id,
        'Activity',
        groupData.Creator.Avatar,
        'You',
        'deleted team project',
        groupData.Name
      )

      firebase.firestore().collection('group').doc(groupData.Key).delete()
      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Delete Success',
        info:
          'Delete successfully, all contributors will not have access to it.',
        imgUrl: '/images/emoji/emoji_happy.png',
        toggle: toggleReload,
        confirm: false,
        cancel: '',
      })
    }, 1500)
  }

  const handleCreate = (projectData: any): void => {
    setProgress(true)
    setTimeout(() => {
      //队伍还有空缺位置
      if (projectData.Capacity > 0) {
        setProgress(false)
        setFeedback({
          show: true,
          msg: 'Create Confirm',
          info:
            'There are still position lefts for your team, Do you still want to create the project?',
          imgUrl: '/images/emoji/emoji_cry.png',
          confirm: true,
          toggle: () => toggleCreate(projectData),
          cancel: toggleClose,
        })
      } else {
        toggleCreate(projectData)
      }
    }, 1000)
  }

  return (
    <div className="group-list-post-container group-list-container">
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Technology</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center">Team Members</StyledTableCell>
              <StyledTableCell align="center">Applied Queue</StyledTableCell>
              <StyledTableCell align="center">Create</StyledTableCell>
              <StyledTableCell align="center">More Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any) => (
              <StyledTableRow key={row.Key}>
                <StyledTableCell component="th" scope="row">
                  {row.Name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Description}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Category}</StyledTableCell>
                <StyledTableCell align="center">{row.Tools[0]}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.StartDate}
                </StyledTableCell>
                <StyledTableCell align="center">{row.EndDate}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.Contributors.length - row.Capacity}/
                  {row.Contributors.length}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() =>
                      displayQueue(
                        row.Key,
                        row.Creator.Id,
                        row.Contributors,
                        row.Capacity,
                        row
                      )
                    }
                  >
                    View
                  </button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button onClick={() => handleCreate(row)}>Create</button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <GroupMenu
                    groupKey={row.Key}
                    handleDelete={() => handleDelete(row)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display the queue list: people who applied the project */}

      <CSSTransition
        in={display}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div>
          <div
            onClick={() => {
              setQueue({
                groupRef: '',
                creatorRef: '',
                data: [],
              })
              setDisplay(false)
            }}
            className="overlay-post"
          ></div>
          <GroupQueue
            contributorList={contributor}
            queueRef={queueKey}
            queueData={queue.data}
            capacity={capacity}
            groupData={groupData}
          />
        </div>
      </CSSTransition>

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
          imgUrl={feedback.imgUrl}
          toggle={feedback.toggle}
          confirm={feedback.confirm}
          cancel={feedback.cancel}
        />
      </CSSTransition>
    </div>
  )
}
