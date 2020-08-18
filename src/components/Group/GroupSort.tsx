import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
      // transform: 'translateY(-25px)',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectItem: {
      fontSize: '13px',
      color: 'black',
      fontFamily: 'quicksand',
    },
  })
)

interface Props {
  selector: any
  handleSelector: (event: any) => void
}

export const GroupSort: React.FC<Props> = ({ handleSelector, selector }) => {
  const classes = useStyles()

  return (
    <div className="group-form-container">
      <FormControl className={classes.formControl}>
        <Select
          className={classes.selectItem}
          value={selector.category}
          onChange={handleSelector}
          name="category"
        >
          <MenuItem className={classes.selectItem} value={' '}>
            All Categories
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'Web App'}>
            Web
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'Android'}>
            Android
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'IOS'}>
            IOS
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'PC'}>
            PC
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'Game'}>
            Game
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'Others'}>
            Others
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <Select
          className={classes.selectItem}
          value={selector.team}
          onChange={handleSelector}
          name="team"
        >
          <MenuItem className={classes.selectItem} value={' '}>
            All Teams
          </MenuItem>
          <MenuItem className={classes.selectItem} value={1}>
            1
          </MenuItem>
          <MenuItem className={classes.selectItem} value={2}>
            2
          </MenuItem>
          <MenuItem className={classes.selectItem} value={3}>
            3
          </MenuItem>
          <MenuItem className={classes.selectItem} value={4}>
            4
          </MenuItem>
          <MenuItem className={classes.selectItem} value={5}>
            5
          </MenuItem>
          <MenuItem className={classes.selectItem} value={6}>
            More than 5
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <Select
          className={classes.selectItem}
          value={selector.duration}
          onChange={handleSelector}
          name="duration"
        >
          <MenuItem className={classes.selectItem} value={' '}>
            All Durations
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'0'}>
            Less than one Week
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'1'}>
            1 - 4 Weeks
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'2'}>
            1 - 3 Months
          </MenuItem>
          <MenuItem className={classes.selectItem} value={'3'}>
            More than 3 months
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
