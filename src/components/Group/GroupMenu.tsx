import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
interface Props {
  handleDelete: () => void
  groupKey: string
}

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

export const GroupMenu: React.FC<Props> = ({ handleDelete, groupKey }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="group-menu-container">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <i onClick={handleClick} className="fas fa-ellipsis-v"></i>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/grouppost/${groupKey}`} style={{ color: 'black' }}>
          <MenuItem className={classes.root}>Edit</MenuItem>
        </Link>

        <MenuItem className={classes.root} onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}
