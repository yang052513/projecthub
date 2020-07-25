import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

interface Props {
  handleDelete: () => void
  handleEdit: () => void
  handleDetails: () => void
}

export const GroupMenu: React.FC<Props> = ({
  handleDelete,
  handleEdit,
  handleDetails,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleDetails}>Details</MenuItem>
      </Menu>
    </div>
  )
}
