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

export default function SimpleMenu() {
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
      <Button
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img src="/images/user.jpg" alt="profile" />
      </Button>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile">
          <MenuItem className={classes.root} onClick={handleClose}>
            Profile
          </MenuItem>
        </Link>
        <Link to="/settings">
          <MenuItem className={classes.root} onClick={handleClose}>
            Setting
          </MenuItem>
        </Link>
        <MenuItem
          className={classes.root}
          onClick={() => firebase.auth().signOut()}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
