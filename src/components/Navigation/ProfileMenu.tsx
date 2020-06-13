import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Logout from '../Common/Logout'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

interface Props {
  avatar: string
}

export const ProfileMenu: React.FC<Props> = ({ avatar }) => {
  const classes = useStyles()
  const db = firebase.firestore()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [logout, setLogout] = useState<boolean>(false)

  //Open the menu modal when click the avatar
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  //Close the menu modal; fired when user click anything
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
          <Link to="/setting/profile">
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

      <div>{logout === true ? <Logout /> : null}</div>
    </div>
  )
}
