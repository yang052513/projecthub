import React from 'react'
import Grid from '@material-ui/core/Grid'
import StoryEditor from './Moment/StoryEditor'
import StoryCard from './Moment/StoryCard'

export default function Moment() {
  return (
    <div className="component-layout">
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <StoryEditor />
        </Grid>
      </Grid>

      <StoryCard
        imgUrl={'images/user.jpg'}
        name={'Yang Li'}
        time={'13:00 Jun 11, 2020'}
        content={'Projecthub is such a wonderful project bro!'}
      />
    </div>
  )
}
