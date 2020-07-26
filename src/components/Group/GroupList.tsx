import React, { useState } from 'react'
import firebase from 'firebase'
import { GroupQueue } from './GroupQueue'
import { GroupMenu } from './GroupMenu'

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

//Table Styling
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: 'black',
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
  },
})

interface Props {
  tableData: any
}

export const GroupList: React.FC<Props> = ({ tableData }) => {
  const classes = useStyles()

  const [display, setDisplay] = useState<boolean>(false)

  const [contributor, setContributor] = useState<Array<Object>>([])
  const [capacity, setCapacity] = useState<number>()
  const [queue, setQueue] = useState<any>({
    groupRef: '',
    creatorRef: '',
    data: [],
  })

  const displayQueue = (
    queueRef: string,
    creatorRef: string,
    contributorList: Array<Object>,
    capacityNum: number
  ) => {
    setDisplay(true)
    setContributor(contributorList)
    setCapacity(capacityNum)

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

  const handleDelete = (
    queueKey: string,
    creatorKey: string,
    contributorList: Array<any>
  ) => {
    // 从Group, creator queue删除
    firebase.firestore().collection('group').doc(queueKey).delete()

    //从Application中删除
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
  }

  return (
    <div>
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
                        row.Capacity
                      )
                    }
                  >
                    View
                  </button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button>Create</button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <GroupMenu
                    groupKey={row.Key}
                    handleDelete={() =>
                      handleDelete(row.Key, row.Creator.Id, row.Contributors)
                    }
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
            queueRef={queue.groupRef}
            creatorRef={queue.creatorRef}
            queueData={queue.data}
            capacity={capacity}
          />
        </div>
      )}
    </div>
  )
}
