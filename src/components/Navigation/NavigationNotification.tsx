import React, { useState, useEffect } from 'react'
import { NavigationNotificationModal } from './NavigationNotificationModal'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Material UI
import Badge from '@material-ui/core/Badge'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { CSSTransition } from 'react-transition-group'

const NotificationBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 0,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      zIndex: 0,
    },
  })
)(Badge)

export const NavigationNotification = () => {
  const user: any = firebase.auth().currentUser

  const [show, setShow] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>([])

  useEffect(() => {
    const fetchNotification = async () => {
      const notificationDocs = await firebase
        .firestore()
        .collection('user')
        .doc(user.uid)
        .collection('Notification')
        .where('Unread', '==', true)
        .get()
      notificationDocs.forEach(doc => {
        setNotification((prevNotification: any) => [
          ...prevNotification,
          doc.data(),
        ])
      })
    }
    fetchNotification()
  }, [])

  const handleToggle = () => {
    setShow(prevShow => !prevShow)
  }

  return (
    <div className="notification-menu">
      <IconButton onClick={handleToggle}>
        <NotificationBadge badgeContent={notification.length} color="primary">
          <NotificationsNoneIcon />
        </NotificationBadge>
      </IconButton>

      <div className="notification-modal-wrap">
        <CSSTransition
          in={show}
          timeout={500}
          classNames="fade-in"
          unmountOnExit
        >
          <NavigationNotificationModal
            offModal={handleToggle}
            notification={notification}
          />
        </CSSTransition>
      </div>
    </div>
  )
}
