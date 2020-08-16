import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'

export const MiscMenu: React.FC = props => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <button
        aria-controls="edit-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.children}
      </Menu>
    </div>
  )
}
