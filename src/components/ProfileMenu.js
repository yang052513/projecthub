import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Logout from './Common/Logout'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

export default function SimpleMenu() {
  const classes = useStyles()
  const db = firebase.firestore()

  const [anchorEl, setAnchorEl] = useState(null)
  const [logout, setLogout] = useState(false)
  const [avatar, setAvatar] = useState('/images/user.jpg')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleLogout() {
    setAnchorEl(null)
    setLogout(true)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Profile')
        .get()
        .then((doc) => {
          if (doc.data().avatar) {
            setAvatar(doc.data().avatar)
          }
        })
    })
  }, [])

  return (
    <div>
      <div>
        <Button
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img className="user-profile-icon" src={avatar} alt="profile" />
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

          <MenuItem className={classes.root} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>

      <div>{logout === true ? <Logout /> : null}</div>
    </div>
  )
}
