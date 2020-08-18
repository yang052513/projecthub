import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MiscMenu } from '../../shared/MiscMenu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { deleteFriend } from '../../../modules/messenger'
import firebase from 'firebase'
import { Feedback } from '../../shared/Feedback'
import { Progress } from '../../shared/Progress'
import { Loading } from '../../shared/Loading'

interface Props {
  friendKey: string
}

interface IFeedback {
  display: boolean
  msg: string
  info: string
  confirm: boolean
  toggle?: () => void
  cancel?: () => void
}

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

export const MessengerListMenu: React.FC<Props> = ({ friendKey }) => {
  const classes = useStyles()
  const user: any = firebase.auth().currentUser
  const [feedback, setFeedback] = useState<IFeedback>({
    display: false,
    msg: '',
    info: '',
    confirm: false,
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleReload = () => {
    window.location.reload()
  }

  const handleDelete = () => {
    setFeedback({
      display: true,
      msg: 'Delete Confirm',
      info:
        'Delete will remove you and your friend from both of your friend list without notify each other',
      confirm: true,
      toggle: confirmDelete,
      cancel: cancelDelete,
    })
  }

  const cancelDelete = () => {
    setFeedback({ ...feedback, display: false })
  }

  const confirmDelete = () => {
    setLoading(true)
    setTimeout(() => {
      deleteFriend(user.uid, friendKey)
      deleteFriend(friendKey, user.uid)
      setLoading(false)
      setFeedback({
        display: true,
        msg: 'Delete Success',
        info: `Removed from your friend list and will not receive any message`,
        confirm: false,
        toggle: handleReload,
      })
    }, 1000)
  }

  return (
    <div>
      <MiscMenu>
        <Link to={`/friends/${friendKey}`}>
          <MenuItem className={classes.root}>Profile</MenuItem>
        </Link>

        <Link to={`/moment/${friendKey}`}>
          <MenuItem className={classes.root}>Story</MenuItem>
        </Link>

        <MenuItem className={classes.root} onClick={handleDelete}>
          Delete
        </MenuItem>
      </MiscMenu>

      {feedback.display && (
        <Feedback
          imgUrl="../../images/emoji/emoji_noidea.png"
          msg={feedback.msg}
          info={feedback.info}
          confirm={feedback.confirm}
          toggle={feedback.toggle}
          cancel={feedback.cancel}
        />
      )}
      {loading && <Progress />}
    </div>
  )
}
