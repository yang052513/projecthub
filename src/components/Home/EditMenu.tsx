import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { Feedback } from '../Common/Feedback'
import { Progress } from '../Common/Progress'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

interface Props {
  docRef: string | undefined
  projectName: string | null | undefined
}

export const EditMenu: React.FC<Props> = ({ docRef, projectName }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showReturn, setShowReturn] = useState<boolean>(false)

  const db = firebase.firestore()
  const user = firebase.auth().currentUser

  let month
  const date = new Date()

  switch (date.getMonth()) {
    case 0:
      month = 'Jan'
      break
    case 1:
      month = 'Feb'
      break
    case 2:
      month = 'Mar'
    case 3:
      month = 'Apr'
    case 4:
      month = 'May'
    case 5:
      month = 'June'
    case 6:
      month = 'July'
    case 7:
      month = 'Aug'
    case 8:
      month = 'Sep'
    case 9:
      month = 'Oct'
    case 10:
      month = 'Nov'
    case 11:
      month = 'Dec'
  }

  const currentTime = `${month} ${
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  } ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //第一层确认
  function showDeleteConfirm() {
    setDeleteConfirm(true)
    setAnchorEl(null)
  }

  function offDeleteConfirm() {
    setDeleteConfirm(false)
  }

  //从数据库中删除项目
  function handleDelete() {
    setLoading(true)
    setTimeout(() => {
      if (user) {
        db.collection('user')
          .doc(user.uid)
          .collection('Project')
          .doc(docRef)
          .delete()
          .then(() => {
            console.log('(๑•̀ㅂ•́)و✧ 已经删除这个项目啦')
            db.collection('user')
              .doc(user.uid)
              .collection('Activity')
              .add({
                Time: currentTime,
                Content: `Deleted project ${projectName}`,
                Key: docRef,
              })
          })
          .catch(error => {
            console.log('Σ( ° △ °|||)︴ 删除项目时出错了...', error)
          })
      }
      setLoading(false)
      setDeleteConfirm(false)
      setShowReturn(true)
    }, 1000)
    setAnchorEl(null)
  }

  function handleReload() {
    window.location.reload()
  }

  return (
    <div>
      {loading === true ? <Progress /> : null}

      {deleteConfirm === true ? (
        <Feedback
          msg="Confirm"
          info="Are you sure to delete this lovely project? w(ﾟДﾟ)w"
          imgUrl="/images/emoji/emoji_scare.png"
          confirm={true}
          toggle={handleDelete}
          cancel={offDeleteConfirm}
        />
      ) : null}

      {showReturn === true ? (
        <Feedback
          msg="Success"
          info="Delete successfully (๑•̀ㅂ•́)و✧"
          imgUrl="/images/emoji/emoji_laugh.png"
          toggle={handleReload}
        />
      ) : null}
      <div>
        <Button
          aria-controls="edit-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <i className="fas fa-ellipsis-h"></i>
        </Button>

        <Menu
          id="edit-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to={`/edit/${docRef}`}>
            <MenuItem className={classes.root} onClick={handleClose}>
              Edit
            </MenuItem>
          </Link>
          <Link to={`/kanban/${docRef}`}>
            <MenuItem className={classes.root} onClick={handleClose}>
              Kanban
            </MenuItem>
          </Link>

          <MenuItem className={classes.root} onClick={showDeleteConfirm}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
