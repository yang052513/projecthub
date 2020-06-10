import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'
import ProjectStatus from './Status/ProjectStatus'
import StatusTag from './Status/StatusTag'

// const demo = [
//   { cnt: 3, name: 'js' },
//   { cnt: 2, name: 'sass' },
//   { cnt: 1, name: 'less' },
//   { cnt: 13, name: 'firebase' },
//   { cnt: 5, name: 'css' },
// ]

// console.log(
//   demo.sort((a, b) => {
//     return a.cnt > b.cnt ? -1 : 1
//   })
// )

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
  const [tagSort, setTagSort] = useState([])
  const [tagCnt, setTagCnt] = useState({ tagCount: '', tagContent: '' })
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
  }, [])

  useEffect(() => {
    let count = {}
    tag.forEach(function (i) {
      count[i] = (count[i] || 0) + 1
    })

    let sortable = []
    for (var x in count) {
      sortable.push({ name: x, cnt: count[x] })
    }
    setTagSort(
      sortable.sort((a, b) => {
        return b[1] - a[1]
      })
    )
  }, [tag])

  return (
    <div className="component-layout status-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectStatus project={project} />
          </Grid>
          <Grid item xs={4}>
            <StatusTag tagSort={tagSort} />
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
