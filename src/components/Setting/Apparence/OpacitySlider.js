import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
  root: {
    width: 350,
  },
})

export default function OpacitySlider(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className="setting-content-slider">
        <p>Side Bar</p>
        <Slider
          name="sidebar"
          value={props.opacity.sidebar}
          onChange={props.switchOpacity('sidebar')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Top Bar</p>
        <Slider
          name="topbar"
          value={props.opacity.topbar}
          onChange={props.switchOpacity('topbar')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Project Card</p>
        <Slider
          name="card"
          value={props.opacity.card}
          onChange={props.switchOpacity('card')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Background</p>
        <Slider
          name="background"
          value={props.opacity.background}
          onChange={props.switchOpacity('background')}
          aria-labelledby="input-slider"
        />
      </div>
    </div>
  )
}
