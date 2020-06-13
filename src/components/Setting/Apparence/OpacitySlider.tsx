import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
  root: {
    width: 350,
  },
})

interface Props {
  opacity: any
  switchOpacity: any
}

export const OpacitySlider: React.FC<Props> = ({ opacity, switchOpacity }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className="setting-content-slider">
        <p>Side Bar</p>
        <Slider
          name="sidebar"
          value={opacity.sidebar}
          onChange={switchOpacity('sidebar')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Top Bar</p>
        <Slider
          name="topbar"
          value={opacity.topbar}
          onChange={switchOpacity('topbar')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Project Card</p>
        <Slider
          name="card"
          value={opacity.card}
          onChange={switchOpacity('card')}
          aria-labelledby="input-slider"
        />
      </div>

      <div className="setting-content-slider">
        <p>Background</p>
        <Slider
          name="background"
          value={opacity.background}
          onChange={switchOpacity('background')}
          aria-labelledby="input-slider"
        />
      </div>
    </div>
  )
}
