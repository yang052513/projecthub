import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'
import ProjectStatus from './Status/ProjectStatus'
import StatusTag from './Status/StatusTag'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '85%',
    margin: '0 auto',
  },
}))

export default function Status() {
  const db = firebase.firestore()
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState([])
  const [tag, setTag] = useState([])
  const [tagCnt, setTagCnt] = useState({ tagCount: 0, tagContent: '' })
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

            doc.data().projectData.Tools.forEach((tag) => {
              setTag((prevTag) => [...prevTag, tag])
            })
          })
        })
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    var maxFreq = 1
    var cnt = 0
    var mostFreqTag
    for (var i = 0; i < tag.length; i++) {
      for (var j = i; j < tag.length; j++) {
        if (tag[i] == tag[j]) cnt++
        if (maxFreq < cnt) {
          maxFreq = cnt
          mostFreqTag = tag[i]
        }
      }
      cnt = 0
    }
    setTagCnt({
      tagCount: maxFreq,
      tagContent: mostFreqTag,
    })
  }, [tag])

  return (
    <div className="component-layout status-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectStatus project={project} />
          </Grid>
          <Grid item xs={4}>
            <StatusTag tagCnt={tagCnt} />
          </Grid>
          <Grid item xs={4}>
            <p>最常做的项目类型</p>
          </Grid>
          <Grid item xs={4}>
            <p>最常互动的合作伙伴 长度为1 显示solo者</p>
          </Grid>
          <Grid item xs={12}>
            <p>Chart js 最近一个月内完成的项目</p>
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
