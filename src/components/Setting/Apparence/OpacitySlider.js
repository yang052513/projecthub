import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import firebase from 'firebase'

const useStyles = makeStyles({
  root: {
    width: 350,
  },
})

export default function InputSlider() {
  const classes = useStyles()
  const db = firebase.firestore()

  const [opacity, setOpacity] = useState({
    sidebar: 100,
    topbar: 100,
    card: 100,
  })

  const handleOpacity = (name) => (event, value) => {
    setOpacity((prevOpacity) => ({
      ...prevOpacity,
      [name]: value,
    }))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Setting')
        .doc('Apparence')
        .update({
          opacity,
        })
    })
  }, [opacity])

  return (
    <div className={classes.root}>
      <div className="setting-content-slider">
        <p>Side Bar</p>
        <Slider
          name="sidebar"
          value={opacity.sidebar}
          onChange={handleOpacity('sidebar')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Top Bar</p>
        <Slider
          name="topbar"
          value={opacity.topbar}
          onChange={handleOpacity('topbar')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Project Card</p>
        <Slider
          name="card"
          value={opacity.card}
          onChange={handleOpacity('card')}
          aria-labelledby="input-slider"
        />
      </div>
    </div>
  )
}
