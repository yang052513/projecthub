import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { Feedback } from '../shared/Feedback'
import { Progress } from '../shared/Progress'
import { timeFormat } from 'current-time-format'
import { useFetchContributor } from '../../hooks/useFetchContributor'
import { addNotification } from '../../modules/modules'
import { deleteProject } from '../../modules/home'
import { useFetchProfile } from '../../hooks/useFetchProfile'
import { CSSTransition } from 'react-transition-group'

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    color: 'black',
  },
})

interface Props {
  docRef: string | undefined | any
  projectName: string | null | undefined
  creatorId: string
}

const { monthStrLong, day, hours, minutes } = timeFormat
const currentTime = `${monthStrLong} ${day} ${hours}:${minutes}`

export const HomeEditMenu: React.FC<Props> = ({
  docRef,
  projectName,
  creatorId,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)
  const contributorList: any = useFetchContributor(user.uid, docRef)

  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showReturn, setShowReturn] = useState<boolean>(false)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const showDeleteConfirm = () => {
    setDeleteConfirm(true)
    setAnchorEl(null)
  }

  //从数据库中删除项目
  const handleDelete = () => {
    setLoading(true)
    setTimeout(() => {
      // 如果是团队项目 通知其他用户
      if (contributorList.length > 1) {
        contributorList.forEach((contributor: any, index: any) => {
          if (index > 0) {
            addNotification(
              contributor.Id,
              `${projectName} has been deleted by the owner and not available anymore`,
              'Project Unavailable',
              '/',
              contributor.Avatar
            )

            firebase
              .firestore()
              .collection('user')
              .doc(contributor.Id)
              .collection('Activity')
              .add({
                Avatar: profile.avatar,
                Message: {
                  Name: profile.profile.profileName,
                  Action: 'deleted project',
                  Title: projectName,
                  Date: currentTime,
                },
              })
              .then(activityRef => {
                firebase
                  .firestore()
                  .collection('user')
                  .doc(contributor.Id)
                  .collection('Activity')
                  .doc(activityRef.id)
                  .update({
                    Key: activityRef.id,
                  })
              })
          }
        })
      }

      //从每个贡献者的集合中删除该项目
      contributorList.forEach((contributor: any) => {
        deleteProject(contributor.Id, docRef)
      })

      firebase
        .firestore()
        .collection('user')
        .doc(user.uid)
        .collection('Activity')
        .add({
          Avatar: profile.avatar,
          Message: {
            Name: 'You',
            Action: 'deleted project',
            Title: projectName,
            Date: currentTime,
          },
        })
        .then(activityRef => {
          firebase
            .firestore()
            .collection('user')
            .doc(user.uid)
            .collection('Activity')
            .doc(activityRef.id)
            .update({
              Key: activityRef.id,
            })
        })

      setLoading(false)
      setDeleteConfirm(false)
      setShowReturn(true)
    }, 500)
    setAnchorEl(null)
  }

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div>
      <CSSTransition
        in={loading}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Progress />
      </CSSTransition>

      <CSSTransition
        in={deleteConfirm}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Feedback
          msg="Confirm"
          info="Are you sure to delete this lovely project? w(ﾟДﾟ)w"
          imgUrl="/images/emoji/emoji_scare.png"
          confirm={true}
          toggle={handleDelete}
          cancel={() => setDeleteConfirm(false)}
        />
      </CSSTransition>

      <CSSTransition
        in={showReturn}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <Feedback
          msg="Success"
          info="Delete successfully (๑•̀ㅂ•́)و✧"
          imgUrl="/images/emoji/emoji_laugh.png"
          toggle={handleReload}
        />
      </CSSTransition>

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
