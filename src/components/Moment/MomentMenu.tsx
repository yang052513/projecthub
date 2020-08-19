import React from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
    fontFamily: 'quicksand',
  },
})

interface Props {
  handleDelete: () => void
}

export const MomentMenu: React.FC<Props> = ({ handleDelete }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="moment-menu-container">
      <Button aria-haspopup="true" onClick={handleClick}>
        <i onClick={handleClick} className="fas fa-ellipsis-v"></i>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.root} onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}
