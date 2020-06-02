import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '30px',
  },

  // 文本框样式
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45ch',
  },
}))

const inputMargin = {
  margin: '12px 8px',
}

function Profile() {
  const classes = useStyles()
  return (
    <div className="setting-content-container">
      <h2>Profile</h2>
      <div className="setting-content-profile-header">
        <img src="/images/user.jpg" alt="profile" />
        <button>Upload Images</button>
      </div>

      <div className={classes.root}>
        <TextField
          id="profile-name-input"
          name="profileName"
          label="Full Name"
          style={inputMargin}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText="Name you want to display while using the app"
        />
        <TextField
          id="profile-location-input"
          name="profileLocation"
          label="Location"
          className={classes.textField}
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="profile-email-input"
          name="profileEmail"
          label="Email Address"
          className={classes.textField}
          helperText="For notification and password reset"
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="profile-bio-input"
          name="profileBio"
          label="Bio"
          style={inputMargin}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Descirbe your self and make some friends"
          variant="outlined"
        />
        <TextField
          id="profile-url-input"
          name="profileWeb"
          label="Personal Website"
          style={inputMargin}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="profile-linkedin-input"
          name="profilelinkedin"
          label="Linkedin URL"
          style={inputMargin}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="profile-github-input"
          name="profileGithub"
          label="Github URL"
          style={inputMargin}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>

      <div className="setting-content-save">
        <button>Save</button>
      </div>
    </div>
  )
}

export default Profile
