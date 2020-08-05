import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'

import { ProjectStatus } from './Status/ProjectStatus'
import { StatusTag } from './Status/StatusTag'
import { StatusType } from './Status/StatusType'
import { StatusContributor } from './Status/StatusContributor'
import { StatusLog } from './Status/StatusLog'
import { StatusActivity } from './Status/StatusActivity'
import { StatusLike } from './Status/StatusLike'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '85%',
      margin: '0 auto',
    },
  })
)

export const Status: React.FC = () => {
  const db = firebase.firestore()
  const user = firebase.auth().currentUser
  const classes = useStyles()

  const [project, setProject] = useState<Array<object | null>>([])
  const [activity, setActivity] = useState<Array<object | null>>([])

  const [type, setType] = useState<Array<string | null>>([])
  const [typeSort, setTypeSort] = useState<Array<any>>([])

  // const [typeCnt, setTypeCnt] = useState<any>({
  //   typeCountt: '',
  //   typeContent: '',
  // })

  const [tag, setTag] = useState<Array<object | null>>([])
  const [tagSort, setTagSort] = useState<Array<any>>([])

  useEffect(() => {
    if (user) {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .get()
        .then(collection => {
          collection.forEach(doc => {
            setProject(prevProject => [...prevProject, doc.data()])
            setType(prevType => [...prevType, doc.data().Category])

            doc.data().Tools.forEach((tag: any) => {
              setTag(prevTag => [...prevTag, tag])
            })
          })
        })

      db.collection('user')
        .doc(user.uid)
        .collection('Activity')
        .get()
        .then(collection => {
          collection.forEach(doc => {
            setActivity(prevActivity => [...prevActivity, doc.data()])
          })
        })
    }
  }, [])

  useEffect(() => {
    let count: { [index: string]: any } = {}
    tag.forEach((i: any) => {
      count[i] = (count[i] || 0) + 1
    })

    let sortable = []
    for (let x in count) {
      sortable.push({ name: x, cnt: count[x] })
    }
    setTagSort(
      sortable.sort((a: any, b: any) => {
        return b[1] - a[1]
      })
    )
  }, [tag])

  useEffect(() => {
    let count: { [index: string]: any } = {}
    type.forEach((i: any) => {
      count[i] = (count[i] || 0) + 1
    })

    let sortable = []
    for (let x in count) {
      sortable.push({ name: x, cnt: count[x] })
    }
    setTypeSort(
      sortable.sort((a: any, b: any) => {
        return b[1] - a[1]
      })
    )
  }, [type])

  // useEffect(() => {
  //   let maxFreq = 1
  //   let cnt = 0
  //   let mostFreqTag
  //   for (let i = 0; i < type.length; i++) {
  //     for (let j = i; j < type.length; j++) {
  //       if (type[i] === type[j]) cnt++
  //       if (maxFreq < cnt) {
  //         maxFreq = cnt
  //         mostFreqTag = type[i]
  //       }
  //     }
  //     cnt = 0
  //   }
  //   setTypeCnt({
  //     typeCount: maxFreq,
  //     typeContent: mostFreqTag,
  //   })
  // }, [type])

  return (
    <div className="component-layout status-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectStatus project={project} />
          </Grid>
          <Grid item xs={8}>
            <StatusActivity />
          </Grid>

          {/* <Grid item xs={3}>
            <StatusLike />
          </Grid> */}
          <Grid item xs={4}>
            <StatusLog activity={activity} />
          </Grid>
          <Grid item xs={4}>
            <StatusTag tagSort={tagSort} />
          </Grid>
          <Grid item xs={4}>
            <StatusType typeSort={typeSort} />
          </Grid>
          <Grid item xs={4}>
            <StatusContributor />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
