import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import ProjectStatus from './Status/ProjectStatus'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export default function Status() {
  const classes = useStyles()

  return (
    <div className="component-layout">
      {/* <p>这里主要放置个人项目的状态</p>
      <ul>
        <li>总共完成项目数量</li>
        <li>用chart js 作统计 一段时间内完成的项目</li>
        <li>标签的数量 标签最多的统计</li>
      </ul> */}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectStatus />
          </Grid>

          {/* <Grid item xs={8}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid> */}
        </Grid>
      </div>
    </div>
  )
}
