import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'
import ProjectStatus from './Status/ProjectStatus'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export default function Status() {
  const db = firebase.firestore()
  const [project, setProject] = useState([])
  const classes = useStyles()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .get()
        .then((collection) => {
          collection.forEach((doc) => {
            setProject((prevProject) => [...prevProject, doc.data()])
          })
        })
    })
  }, [])

  return (
    <div className="component-layout">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectStatus project={project} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
