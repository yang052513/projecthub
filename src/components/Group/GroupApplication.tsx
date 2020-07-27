import React, { useState } from 'react'
import firebase from 'firebase'

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

import { Feedback } from '../Common/Feedback'
import { Progress } from '../Common/Progress'

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
  applicationList: any
}

export const GroupApplication: React.FC<Props> = ({ applicationList }) => {
  const classes = useStyles()
  const user: any = firebase.auth().currentUser

  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })
  const [progress, setProgress] = useState<boolean>(false)

  const handleReload = () => {
    window.location.reload()
  }

  const deleteDoc = (
    collectionRef: string,
    docRef: string,
    subCollectionRef: string,
    docKey: string
  ): void => {
    firebase
      .firestore()
      .collection(collectionRef)
      .doc(docRef)
      .collection(subCollectionRef)
      .doc(docKey)
      .delete()
      .then(() => {
        console.log(`从${user.uid}中删除`)
      })
  }

  // Delete Request from database
  const handleDelete = (groupRef: string, groupData: any): void => {
    setProgress(true)

    setTimeout(() => {
      firebase
        .firestore()
        .collection('group')
        .doc(groupRef)
        .collection('Requests')
        .doc(user.uid)
        .delete()
        .then(() => {
          console.log('从公共group集合中删除用户的请求成功')
        })

      deleteDoc('group', groupRef, 'Requests', user.uid)
      deleteDoc('user', user.uid, 'Application', groupRef)

      //如果已经加入成功选择删除，要把contributorList的位置改为None
      let contributorList = groupData.Contributors
      groupData.Contributors.forEach(
        (contributor: any, index: string | number) => {
          if (contributor.Id === user.uid) {
            contributorList[index] = { Avatar: 'None', Id: 'None' }
          }
        }
      )

      //更新group的贡献者列表以及空缺位子
      firebase
        .firestore()
        .collection('group')
        .doc(groupRef)
        .update({
          Contributors: contributorList,
          Capacity: groupData.Capacity + 1,
        })
      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Delete Success',
        info: 'Your request has been deleted successfully',
      })
    }, 1500)
  }

  return (
    <div className="group-list-application-container group-list-container">
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Creator</StyledTableCell>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Technology</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center">Team Members</StyledTableCell>
              <StyledTableCell align="center">Result</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationList.map((row: any) => (
              <StyledTableRow key={row.data.Key}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={row.data.Creator.Avatar}
                    alt=""
                    width="50px"
                    height="50px"
                    style={{ borderRadius: '50%' }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.data.Name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.data.Category}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.data.Description}
                </StyledTableCell>
                <StyledTableCell>{row.data.Tools[0]}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.data.StartDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.data.EndDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.data.Contributors.length - row.data.Capacity}/
                  {row.data.Contributors.length}
                </StyledTableCell>
                <StyledTableCell align="center">{row.result}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => {
                      handleDelete(row.data.Key, row.data)
                    }}
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {progress && <Progress />}
      {feedback.show && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_happy.png"
          toggle={handleReload}
        />
      )}
    </div>
  )
}
