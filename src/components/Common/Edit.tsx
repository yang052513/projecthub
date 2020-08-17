import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import firebase from 'firebase'
import { Feedback } from './Feedback'
import { Progress } from './Progress'
import { Link, useParams } from 'react-router-dom'
import { useFetchProfile } from '../Hooks/useFetchProfile'
import { timeFormat } from 'current-time-format'
import { useFetchContributor } from '../Hooks/useFetchContributor'
import { addNotification } from '../../modules/modules'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  // 文本框样式
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45ch',
  },
  // 下拉选择菜单样式
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const Edit: React.FC = () => {
  const classes = useStyles()
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser
  const history = useHistory()
  //用户选择的当前项目密匙
  const params: any = useParams()

  const profile = useFetchProfile(user.uid)

  //prompt信息：加载动画，modal反馈，错误提示和信息
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [fail, setFail] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [deleteTool, setDeleteTool] = useState({
    status: false,
    name: '',
  })

  //当前的时间 年-月-日格式
  const { year, monthNum, monthStrLong, day, hours, minutes } = timeFormat

  const currentDay = `${year}-${monthNum}-${day}`
  const currentTime = `${monthStrLong} ${day} ${hours}:${minutes}`

  const date = new Date()
  const currentMonth: any =
    date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()

  //从数据库读取的信息
  const [textInput, setTextInput] = useState({
    projectName: '',
    projectDesc: '',
    projectDate: currentDay,
  })
  const [tool, setTool] = useState<any>([])
  const [status, setStatus] = useState('In Progress')

  const [category, setCategory] = useState<string>('Android')
  const [oldStatus, setOldStatus] = useState('')

  const [statusUpdate, setStatusUpdate] = useState<boolean>(false)

  const [publicProject, setPublicProject] = useState(true)

  const contributorList: any = useFetchContributor(user.uid, params.ref)

  //初始化加载数据库内该项目的信息
  useEffect(() => {
    db.collection('user')
      .doc(user.uid)
      .collection('Project')
      .doc(params.ref)
      .get()
      .then((doc: any) => {
        setTextInput({
          projectName: doc.data().Name,
          projectDesc: doc.data().Description,
          projectDate: doc.data().StartDate,
        })
        setCategory(doc.data().Category)
        setTool(doc.data().Tools)
        setStatus(doc.data().Status)
        setOldStatus(doc.data().Status)
        setPublicProject(doc.data().Privacy === 'Public' ? true : false)
      })
  }, [])

  function handleFail() {
    setFail(false)
  }

  function handleReload() {
    window.location.reload()
  }

  //点击垃圾桶按钮弹出确认modal
  const handleDelete = (event: { currentTarget: { id: any } }) => {
    setDeleteTool({
      status: true,
      name: event.currentTarget.id,
    })
    setErrorMsg(
      `Do you want to delete ${event.currentTarget.id} from tool box?`
    )
  }

  //   确认删除tool
  const deleteYes = () => {
    tool.splice(tool.indexOf(deleteTool.name), 1)
    setDeleteTool({
      status: false,
      name: '',
    })
  }

  //取消删除tool
  function deleteNo() {
    setDeleteTool({
      status: false,
      name: '',
    })
  }

  //管理普通文本输入，名称，简介，分类
  const handleTextField = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setTextInput(prevText => ({
      ...prevText,
      [name]: value,
    }))
  }

  // 管理项目的tool标签，点击添加按钮时会append到文本框下方
  const handleTool = () => {
    let toolInputTarget: any = document.getElementById('project-tool-input')
    let toolInput = toolInputTarget.value

    if (toolInput === '') {
      setFail(true)
      setErrorMsg('Please add the tool you will use ヽ(￣д￣;)ノ')
    } else if (tool.includes(toolInput)) {
      setFail(true)
      setErrorMsg('You already included that tool... ヽ(￣д￣;)ノ')
    } else {
      setTool((prevTool: any) => [...prevTool, toolInput])
    }

    toolInput = ''
  }

  const toolList = tool.map((item: any) => (
    <li key={item}>
      <i onClick={handleDelete} id={item} className="fas fa-trash-alt"></i>
      {item}
    </li>
  ))

  //管理项目进程 4个状态可选 默认In Progress
  const handleStatus = (event: { target: { value: any } }) => {
    setStatus(event.target.value)
    setStatusUpdate(true)
  }

  //管理项目公开性 默认公开Public
  const handlePublic = (event: {
    target: { checked: React.SetStateAction<boolean> }
  }) => {
    setPublicProject(event.target.checked)
  }

  const handleCategory = (event: { target: { value: any } }) => {
    setCategory(event.target.value)
  }
  //上传项目信息到云端
  const handleSave = () => {
    if (
      textInput.projectName === '' ||
      textInput.projectDesc === '' ||
      tool.length === 0
    ) {
      setFail(true)
      setErrorMsg('Please fill the information ヽ(￣д￣;)ノ')
    } else {
      //如果表格都填写
      setLoading(true)
      setTimeout(() => {
        let projectData = {
          Key: params.ref,
          Creator: {
            Avatar: profile.avatar,
            Id: user.uid,
          },
          Public: publicProject,
          Like: 0,
          Name: textInput.projectName,
          Status: status,
          Category: category,
          StartDate: textInput.projectDate,
          EndDate: '',
          Description: textInput.projectDesc,
          Tools: tool,
          Privacy: publicProject === true ? 'Public' : 'Private',
          Contributors: contributorList,
        }

        //更新所有队员
        contributorList.forEach((contributor: any, index: any) => {
          db.collection('user')
            .doc(contributor.Id)
            .collection('Project')
            .doc(params.ref)
            .update(projectData)

          //写入到统计集合中
          if (statusUpdate) {
            db.collection('user')
              .doc(contributor.Id)
              .collection('Statistics')
              .doc(currentMonth)
              .update({
                [`${oldStatus}`]: firebase.firestore.FieldValue.increment(-1),
                [`${status}`]: firebase.firestore.FieldValue.increment(1),
              })
          }

          if (index > 0) {
            addNotification(
              contributor.Id,
              `${profile.profile.profileName} edited project ${textInput.projectName}`,
              'Project Details Update',
              '/',
              profile.avatar
            )
            db.collection('user')
              .doc(contributor.Id)
              .collection('Activity')
              .add({
                Avatar: profile.avatar,
                Message: {
                  Name: profile.profile.profileName,
                  Action: 'edited project',
                  Title: textInput.projectName,
                  Date: currentTime,
                },
              })
              .then(activityRef => {
                db.collection('user')
                  .doc(contributor.Id)
                  .collection('Activity')
                  .doc(activityRef.id)
                  .update({
                    Key: activityRef.id,
                  })
              })
          }
        })

        //只写入项目拥有者 写入到日志中
        db.collection('user')
          .doc(user.uid)
          .collection('Activity')
          .add({
            Avatar: profile.avatar,
            Message: {
              Name: 'You',
              Action: 'edited project',
              Title: textInput.projectName,
              Date: currentTime,
            },
          })
          .then(activityRef => {
            db.collection('user')
              .doc(user.uid)
              .collection('Activity')
              .doc(activityRef.id)
              .update({
                Key: activityRef.id,
              })
          })

        //写入到公开数据库
        //如果改为公开项目 写入到公开集合
        if (publicProject) {
          db.collection('project').doc(params.ref).set(projectData)
        } else {
          //If the project changed from public to private, delete from public database
          let projectRef = db.collection('project').doc(params.ref)
          projectRef.get().then(doc => {
            if (doc.exists) {
              db.collection('project')
                .doc(params.ref)
                .delete()
                .then(() => {
                  console.log('已经从公开数据中删除该项目')
                })
            }
          })
        }
        // })
        setLoading(false)
        setFeedback(true)
      }, 2000)

      console.log('项目成功修改并保存到云端~ ୧(๑•̀⌄•́๑)૭✧')
    }
  }

  return (
    <div>
      {loading === true ? <Progress /> : null}

      {/* 项目修改成功反馈 */}
      {feedback === true ? (
        <div>
          <Feedback
            msg="Success"
            info="The project saved successfully ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            toggle={() => history.push('/')}
          />
        </div>
      ) : null}

      {/* 项目缺少信息错误反馈 */}
      {fail === true ? (
        <Feedback
          msg="Error"
          info={errorMsg}
          imgUrl="/images/emoji/emoji_scare.png"
          toggle={handleFail}
        />
      ) : null}

      {/* 删除项目tool确认信息 */}
      {deleteTool.status === true ? (
        <Feedback
          msg="Confirm"
          info={errorMsg}
          imgUrl="/images/emoji/emoji_cry.png"
          toggle={deleteYes}
          cancel={deleteNo}
          confirm={true}
        />
      ) : null}

      {/* 项目表单信息容器 */}
      <div className="project-form-container component-layout">
        <div className={classes.root}>
          <div>
            <div className="project-form-header-container">
              <h2>Edit Your Project</h2>
              <p>Edit your project information</p>
            </div>

            {/* 项目名称输入 */}
            <TextField
              id="project-name-input"
              name="projectName"
              onChange={handleTextField}
              label="Project Name"
              style={{ margin: 8 }}
              value={textInput.projectName}
              helperText="Project name should be meaningful and memorable!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

            {/* 项目创建时间输入 */}
            <TextField
              id="project-date-input"
              name="projectDate"
              onChange={handleTextField}
              label="Create Date"
              type="date"
              defaultValue={textInput.projectDate}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* 项目分类输入，之后可以用来分类filter */}

            <FormControl
              variant="outlined"
              margin="dense"
              className={classes.formControl}
            >
              <InputLabel>Project Category</InputLabel>
              <Select
                name="category"
                value={category}
                onChange={handleCategory}
                label="Project Category"
              >
                <MenuItem value="Android">Android</MenuItem>
                <MenuItem value="IOS">IOS</MenuItem>
                <MenuItem value="PC/Mac">PC/Mac</MenuItem>
                <MenuItem value="Game">Game</MenuItem>
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
            {/* 项目介绍输入 */}
            <TextField
              id="project-desc-input"
              name="projectDesc"
              onChange={handleTextField}
              label="Description"
              style={{ margin: 8 }}
              value={textInput.projectDesc}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

            {/* 项目工具，涉及到的技术标签，可自定义添加 */}
            <div className="project-tool-input-container">
              <TextField
                label="Tools"
                id="project-tool-input"
                placeholder="Tools that used"
                className={classes.textField}
                helperText="Click add button to add more tools"
                margin="dense"
                variant="outlined"
              />

              <button onClick={handleTool} className="project-add-tool-btn">
                Add
              </button>
              <ul>{toolList}</ul>
            </div>

            {/* 项目状态选择菜单，默认设置为进行中 */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Project Status
              </InputLabel>
              <Select
                id="project-status-input"
                name="status"
                value={status}
                onChange={handleStatus}
                label="Project Status"
              >
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Planning">Planning</MenuItem>
                <MenuItem value="Dropped">Dropped</MenuItem>
              </Select>
            </FormControl>

            {/* 项目公开状态开关 */}
            <div className="project-input-privacy-container">
              <FormControlLabel
                control={
                  <Switch
                    onChange={handlePublic}
                    checked={publicProject}
                    name="Privacy"
                    color="primary"
                  />
                }
                label={publicProject === true ? 'Public' : 'Private'}
                labelPlacement="start"
              />
              {publicProject === true ? (
                <p className="project-prompt">
                  By enable public, your project information will be visiable to
                  everyone
                </p>
              ) : (
                <p className="project-prompt">
                  By enable private, your project will only be visible to
                  yourself
                </p>
              )}
            </div>

            <div className="project-input-submit-container">
              <Link to="/">
                <button>Cancel</button>
              </Link>

              <button onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
