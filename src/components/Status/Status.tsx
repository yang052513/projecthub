import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'

import { ProjectStatus } from './ProjectStatus'
import { StatusTag } from './StatusTag'
import { StatusType } from './StatusType'
import { StatusContributor } from './StatusContributor'
import { StatusLog } from './StatusLog'
import { StatusActivity } from './StatusActivity'
import { StatusLike } from './StatusLike'
import { triggerAsyncId } from 'async_hooks'
import { Loading } from '../shared/Loading'

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
  const [social, setSocial] = useState<Array<object | null>>([])

  const [type, setType] = useState<Array<string | null>>([])
  const [typeSort, setTypeSort] = useState<Array<any>>([])

  const [category, setCategory] = useState<any>()
  // const [typeCnt, setTypeCnt] = useState<any>({
  //   typeCountt: '',
  //   typeContent: '',
  // })

  const [tag, setTag] = useState<Array<object | null>>([])
  const [tagSort, setTagSort] = useState<Array<any>>([])

  const [loading, setLoading] = useState({
    project: true,
    activity: true,
    type: true,
    tag: true,
    social: true,
  })

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

          setLoading({
            ...loading,
            project: false,
            type: false,
            tag: false,
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
          setLoading({
            ...loading,
            activity: false,
          })
        })

      db.collection('user')
        .doc(user.uid)
        .collection('Social')
        .get()
        .then(collection => {
          collection.forEach(doc => {
            setSocial(prevSocial => [...prevSocial, doc.data()])
          })
          setLoading({
            ...loading,
            social: false,
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
    let typeData: any = {
      Android: 0,
      IOS: 0,
      Web: 0,
      'PC/Mac': 0,
      Game: 0,
      Others: 0,
    }
    type.forEach((item: any) => {
      typeData[item] += 1
    })
    setCategory(typeData)
  }, [type])

  return (
    <div className="component-layout status-container">
      {!(
        loading.project &&
        loading.activity &&
        loading.tag &&
        loading.type &&
        loading.social
      ) ? (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProjectStatus project={project} />
            </Grid>
            <Grid item xs={8}>
              <StatusActivity />
            </Grid>

            <Grid item xs={4}>
              <StatusLike social={social} />
            </Grid>

            <Grid item xs={4}>
              <StatusTag tagSort={tagSort} />
            </Grid>
            <Grid item xs={4}>
              <StatusType category={category} />
            </Grid>

            <Grid item xs={4}>
              <StatusLog activity={activity} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
