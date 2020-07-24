import React, { useState } from 'react'
import firebase, { database } from 'firebase'
import { GroupQueue } from './GroupQueue'

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
  const user: any = firebase.auth().currentUser

  const [queue, setQueue] = useState<any>({
    display: false,
    data: [],
  })

  const displayQueue = (queueRef: string) => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Queue')
      .doc(queueRef)
      .collection('Requests')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(requestDoc => {
          setQueue((prevState: any) => ({
            display: true,
            data: [...prevState.data, requestDoc.data()],
          }))
        })
      })
  }

  return (
    <div>
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell>Creator</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Technology</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Team Members</StyledTableCell>
              <StyledTableCell>Applied Queue</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any) => (
              <StyledTableRow key={row.Key}>
                <StyledTableCell component="th" scope="row">
                  {row.docData.Name}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src={row.docData.Creator.Avatar}
                    alt=""
                    width="40px"
                    height="40px"
                    style={{ borderRadius: '50%' }}
                  />
                </StyledTableCell>
                <StyledTableCell>{row.docData.Category}</StyledTableCell>
                <StyledTableCell>{row.docData.Description}</StyledTableCell>
                <StyledTableCell>{row.docData.Tools[0]}</StyledTableCell>
                <StyledTableCell>{row.docData.StartDate}</StyledTableCell>
                <StyledTableCell>{row.docData.EndDate}</StyledTableCell>
                <StyledTableCell>
                  {row.docData.Contributors.length}
                </StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => displayQueue(row.Key)}>View</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {queue.display && (
        <div>
          <div
            onClick={() =>
              setQueue({
                display: false,
                data: [],
              })
            }
            className="overlay-post"
          ></div>
          <GroupQueue queueData={queue.data} />
        </div>
      )}
    </div>
  )
}
