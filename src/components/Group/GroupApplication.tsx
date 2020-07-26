import React, { useState, useEffect } from 'react'
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
  applicationList: any
}

export const GroupApplication: React.FC<Props> = ({ applicationList }) => {
  const classes = useStyles()
  console.log(applicationList)
  return (
    <div>
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
          {/* <TableBody>
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
                  <button>View</button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button>Create</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  )
}
