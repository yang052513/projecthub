import React from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        content: '""',
      },
    },
  })
)(Badge)

interface Props {
  avator: string
  isOnline: boolean
}

export const AvatarOnline: React.FC<Props> = ({ avator, isOnline }) => {
  return (
    <div className="avatar-container">
      <StyledBadge
        className={isOnline ? 'avatar-badge-online' : 'avatar-badge-offline'}
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar alt="" src={avator} />
      </StyledBadge>
    </div>
  )
}
