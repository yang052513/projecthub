import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import Logout from '../../auth/Logout'
import { ProfileContext } from '../../context/ProfileContext'

// Material UI
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

export const NavigationProfile: React.FC = () => {
  const user: any = firebase.auth().currentUser
  const profile: any = useContext(ProfileContext)

  const [logout, setLogout] = useState<boolean>(false)

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    setLogout(true)
  }

  return (
    <div>
      <div>
        <Button aria-haspopup="true" onClick={handleClick}>
          <img
            className="user-profile-icon"
            src={profile.avatar}
            alt="profile"
          />
        </Button>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to={`/friends/${user.uid}`}>
            <MenuItem className={classes.root} onClick={handleClose}>
              Profile
            </MenuItem>
          </Link>
          <Link to="/setting/profile">
            <MenuItem className={classes.root} onClick={handleClose}>
              Setting
            </MenuItem>
          </Link>

          <MenuItem className={classes.root} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>

      <div>{logout && <Logout />}</div>
    </div>
  )
}
