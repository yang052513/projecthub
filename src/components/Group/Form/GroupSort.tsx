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
      transform: 'translateY(-25px)',
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

export const GroupSort = () => {
  const classes = useStyles()
  const [value, setValue] = useState('Web App')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.selectItem}
          value={value}
          onChange={handleChange}
          name="category"
        >
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
    </div>
  )
}
