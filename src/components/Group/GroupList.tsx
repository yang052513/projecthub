import React, { useState } from 'react'
import firebase from 'firebase'
import { GroupQueue } from './GroupQueue'
import { GroupMenu } from './GroupMenu'
import { Feedback } from '../Common/Feedback'
import { Progress } from '../Common/Progress'
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
import { group } from 'console'
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
    width: '80%',
    margin: '0 auto',
  },
})

interface Props {
  tableData: any
}

export const GroupList: React.FC<Props> = ({ tableData }) => {
  const classes = useStyles()
  const history = useHistory()
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

  const toggleCreate = (projectData: any) => {
    setProgress(true)
    setTimeout(() => {
      //Delete Empty Contributor
      let contributorList: any = []
      projectData.Contributors.forEach((contributor: any, index: any) => {
        if (contributor.Id !== 'None') {
          contributorList.push(contributor)
        }

        if (contributor.Id !== 'None' && index > 0) {
          firebase
            .firestore()
            .collection('user')
            .doc(contributor.Id)
            .collection('Application')
            .doc(projectData.Key)
            .delete()
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

      // 写入到project集合 默认公开 进行中
      firebase
        .firestore()
        .collection('project')
        .doc(projectData.Key)
        .set(projectDoc)

      // 写入到每个用户的Project的集合中
      contributorList.forEach((contributor: any) => {
        firebase
          .firestore()
          .collection('user')
          .doc(contributor.Id)
          .collection('Project')
          .doc(projectData.Key)
          .set(projectDoc)
      })

      // 创建成功后!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //Delete from group Collection and contributor Application collection 创建状态
      firebase.firestore().collection('group').doc(projectData.Key).delete()

      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Create Success',
        info: 'Project created successfully, please check your dashboard',
        imgUrl: '/images/emoji/emoji_happy.png',
        toggle: toggleHomeDirect,
      })
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
  const handleDelete = (queueKey: string, contributorList: Array<any>) => {
    setProgress(true)

    setTimeout(() => {
      // Delete Request docs
      firebase
        .firestore()
        .collection('group')
        .doc(queueKey)
        .collection('Requests')
        .get()
        .then(requestDocs => {
          //If there are any Request docs exists
          if (requestDocs.docs.length > 0) {
            requestDocs.forEach(doc => {
              firebase
                .firestore()
                .collection('user')
                .doc(doc.data().Key)
                .collection('Application')
                .doc(queueKey)
                .delete()
              // Delet from each user that applied
              firebase
                .firestore()
                .collection('group')
                .doc(queueKey)
                .collection('Requests')
                .doc(doc.data().Key)
                .delete()
            })
          }
        })
      // Delete from user Application collection
      contributorList.forEach((contributor, index) => {
        if (contributor.Id !== 'None' && index > 0) {
          firebase
            .firestore()
            .collection('user')
            .doc(contributor.Id)
            .collection('Application')
            .doc(queueKey)
            .delete()
            .then(() => {
              console.log(`从${contributor.Id}的申请中删除项目信息`)
            })
        }
      })

      firebase.firestore().collection('group').doc(queueKey).delete()
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
          msg: 'Create Failed',
          info:
            'There are still position lefts for your team, Do you still want to create the project?',
          toggle: () => toggleCreate(projectData),
          imgUrl: '/images/emoji/emoji_cry.png',
          confirm: true,
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
                    handleDelete={() => handleDelete(row.Key, row.Contributors)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display the queue list: people who applied the project */}
      {display && (
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
      )}

      {progress && <Progress />}
      {feedback.show && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl={feedback.imgUrl}
          toggle={feedback.toggle}
          confirm={feedback.confirm}
          cancel={feedback.cancel}
        />
      )}
    </div>
  )
}
