import React, { useState, useEffect } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {
  StatusHeader,
  StatusTools,
  StatusCategory,
  StatusLog,
  StatusAnalysis,
  StatusSocial,
} from './index'
import { Loading } from '../shared/Loading'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { CSSTransition } from 'react-transition-group'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '90%',
      margin: '0 auto',
    },
    chart: {
      minWidth: '1024px',
      '@media (max-width:1742px)': {
        minWidth: '100%',
      },
    },
    card: {
      minWidth: '510px',
    },
  })
)

export const Status: React.FC = () => {
  const user: any = firebase.auth().currentUser
  const classes = useStyles()

  const [project, setProject] = useState<Array<object | null>>([])
  const [statistics, setStatistics] = useState<Array<object | null>>([])
  const [activity, setActivity] = useState<Array<object | null>>([])
  const [social, setSocial] = useState<Array<object | null>>([])
  const [tools, setTools] = useState<Array<object | null>>([])
  const [category, setCategory] = useState<Array<object | null>>([])

  const [type, setType] = useState<Array<string | null>>([])
  const [tag, setTag] = useState<Array<object | null>>([])

  const [projectLoading, setProjectLoading] = useState(false)
  const [logLoading, setLogLoading] = useState(false)
  const [statLoading, setStatLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)

  const userDocRef = firebase.firestore().collection('user').doc(user.uid)

  useEffect(() => {
    const fetchProject = async () => {
      const collection = await userDocRef.collection('Project').get()
      collection.forEach(doc => {
        setProject(prevProject => [...prevProject, doc.data()])
        setType(prevType => [...prevType, doc.data().Category])
        doc.data().Tools.forEach((tag: any) => {
          setTag(prevTag => [...prevTag, tag])
        })
      })
      setProjectLoading(true)
    }
    fetchProject()
  }, [])

  useEffect(() => {
    const fetchStatistics = async () => {
      const docs = await userDocRef.collection('Statistics').get()
      docs.forEach(doc => {
        setStatistics((prevStat: any) => [...prevStat, doc.data()])
      })
      setStatLoading(true)
    }
    fetchStatistics()
  }, [])

  useEffect(() => {
    const fetchLog = async () => {
      const collection = await userDocRef.collection('Activity').get()
      collection.forEach(doc => {
        setActivity(prevActivity => [...prevActivity, doc.data()])
      })
      setLogLoading(true)
    }
    fetchLog()
  }, [])

  useEffect(() => {
    const fetchSocial = async () => {
      const collection = await userDocRef.collection('Social').get()
      collection.forEach(doc => {
        setSocial(prevSocial => [...prevSocial, doc.data()])
      })
      setSocialLoading(true)
    }
    fetchSocial()
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
    setTools(
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
      <CSSTransition
        in={!projectLoading || !statLoading || !socialLoading || !logLoading}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Loading />
      </CSSTransition>

      <CSSTransition
        in={projectLoading && statLoading && socialLoading && logLoading}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StatusHeader project={project} />
            </Grid>
            <Grid item xs={12} sm={8} className={classes.chart}>
              <StatusAnalysis statistics={statistics} />
            </Grid>

            <Grid item xs className={classes.card}>
              <StatusSocial social={social} />
            </Grid>

            <Grid item xs className={classes.card}>
              <StatusTools tools={tools} />
            </Grid>
            <Grid item xs className={classes.card}>
              <StatusCategory category={category} />
            </Grid>

            <Grid item xs className={classes.card}>
              <StatusLog activity={activity} />
            </Grid>
          </Grid>
        </div>
      </CSSTransition>
    </div>
  )
}
