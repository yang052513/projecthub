import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { Feedback } from '../Common/Feedback'
import { Progress } from '../Common/Progress'
import { timeFormat } from 'current-time-format'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

interface Props {
  docRef: string | undefined
  projectName: string | null | undefined
  creatorId: string
}

const { monthStrLong, day, hours, minutes } = timeFormat

export const EditMenu: React.FC<Props> = ({
  docRef,
  projectName,
  creatorId,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showReturn, setShowReturn] = useState<boolean>(false)

  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser

  const currentTime = `${monthStrLong} ${day} ${hours}:${minutes}`

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
          <Link to={`/kanban/${docRef}`}>
            <MenuItem className={classes.root} onClick={handleClose}>
              Kanban
            </MenuItem>
          </Link>

          {/* 如果不是项目拥有者，屏蔽编辑和删除功能 */}
          {creatorId === user.uid && (
            <div>
              <Link to={`/edit/${docRef}`}>
                <MenuItem className={classes.root} onClick={handleClose}>
                  Edit
                </MenuItem>
              </Link>

              <MenuItem className={classes.root} onClick={showDeleteConfirm}>
                Delete
              </MenuItem>
            </div>
          )}
        </Menu>
      </div>
    </div>
  )
}
