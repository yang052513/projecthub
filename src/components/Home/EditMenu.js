import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

export default function SimpleMenu(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <div>
        <Button
          aria-controls="edit-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <i className="fas fa-ellipsis-h"></i>
        </Button>

        <Menu
          id="edit-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to={`/edit/${props.docRef}`}>
            <MenuItem className={classes.root} onClick={handleClose}>
              Edit
            </MenuItem>
          </Link>
          <Link to="/settings">
            <MenuItem className={classes.root} onClick={handleClose}>
              Kanban
            </MenuItem>
          </Link>
          <Link to="/settings">
            <MenuItem className={classes.root} onClick={handleClose}>
              Delete
            </MenuItem>
          </Link>
        </Menu>
      </div>
    </div>
  )
}
