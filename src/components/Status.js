import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'
import ProjectStatus from './Status/ProjectStatus'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '85%',
    margin: '0 auto',
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
          <Grid item xs={6}>
            <p>最常使用的标签</p>
          </Grid>
          <Grid item xs={6}>
            <p>最常做的项目类型</p>
          </Grid>
          <Grid item xs={6}>
            <p>Chart js 最近一个月内完成的项目</p>
          </Grid>
          <Grid item xs={6}>
            <p>最常互动的合作伙伴 长度为1 显示solo者</p>
          </Grid>
          <Grid item xs={6}>
            <p>获得最多赞的项目</p>
          </Grid>
          <Grid item xs={6}>
            <p>活动状态日志 eg 时间-添加了一个新的项目， 更改了...</p>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
