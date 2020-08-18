import React from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import { useFetchOnline } from '../../hooks/useFetchOnline'

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
  userKey: string
  userName: string
}

export const AvatarOnline: React.FC<Props> = ({
  avator,
  userKey,
  userName,
}) => {
  const isOnline = useFetchOnline(userKey)

  return (
    <div className="messenger-friend-list-profile">
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
      <div>
        <h4>{userName}</h4>
        <p>{isOnline ? 'Online' : 'Offline'}</p>
      </div>
    </div>
  )
}
