import React from 'react'
import Grid from '@material-ui/core/Grid'
import StoryEditor from './Moment/StoryEditor'

export default function Moment() {
  return (
    <div className="component-layout">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StoryEditor />
        </Grid>
      </Grid>
    </div>
  )
}
