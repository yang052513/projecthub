import React, { useState, useEffect } from 'react'
import Badge from '@material-ui/core/Badge'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import firebase from 'firebase'

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { NotificationModal } from './NotificationModal'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 0,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  })
)(Badge)

export const NotificationMenu = () => {
  const user: any = firebase.auth().currentUser
  const [show, setShow] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>([])

  const fetchNotification = () => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Notification')
      .get()
      .then(notificationDocs => {
        notificationDocs.forEach(doc => {
          setNotification((prevNotification: any) => [
            ...prevNotification,
            doc.data(),
          ])
        })
      })
  }

  useEffect(fetchNotification, [])

  return (
    <div className="notification-menu">
      <IconButton onClick={() => setShow(true)} aria-label="cart">
        <StyledBadge badgeContent={notification.length} color="secondary">
          <NotificationsNoneIcon />
        </StyledBadge>
      </IconButton>

      <div className="notification-modal-wrap">
        {show && (
          <NotificationModal
            offModal={() => setShow(false)}
            notification={notification}
          />
        )}
      </div>
    </div>
  )
}
