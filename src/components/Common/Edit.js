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
import Feedback from './Feedback'
import { Progress } from './Progress'
import { Link, useParams } from 'react-router-dom'

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

export default function EditProject(props) {
  const classes = useStyles()
  const db = firebase.firestore()

  //用户选择的当前项目密匙
  const params = useParams()
  //   console.log(params.ref)

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
  const date = new Date()
  const currentDay = `${date.getFullYear()}-${
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

  let month
  switch (date.getMonth()) {
    case 0:
      month = 'Jan'
      break
    case 1:
      month = 'Feb'
      break
    case 2:
      month = 'Mar'
      break
    case 3:
      month = 'Apr'
      break
    case 4:
      month = 'May'
      break
    case 5:
      month = 'June'
      break
    case 6:
      month = 'July'
      break
    case 7:
      month = 'Aug'
      break
    case 8:
      month = 'Sep'
      break
    case 9:
      month = 'Oct'
      break
    case 10:
      month = 'Nov'
      break
    case 11:
      month = 'Dec'
      break
  }

  const currentTime = `${month} ${
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  } ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`

  //从数据库读取的信息
  const [textInput, setTextInput] = useState({
    projectName: '',
    projectCategory: '',
    projectDesc: '',
    projectDate: currentDay,
  })
  const [tool, setTool] = useState([])
  const [status, setStatus] = useState('In Progress')
  const [publicProject, setPublicProject] = useState(true)

  //初始化加载数据库内该项目的信息
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .doc(params.ref)
        .get()
        .then(doc => {
          setTextInput({
            projectName: doc.data().projectData.Name,
            projectCategory: doc.data().projectData.Category,
            projectDesc: doc.data().projectData.Desc,
            projectDate: doc.data().projectData.Date,
          })
          setTool(doc.data().projectData.Tools)
          setStatus(doc.data().projectData.Status)
          setPublicProject(
            doc.data().projectData.Privacy === 'Public' ? true : false
          )
        })
    })
  }, [])

  function handleFail() {
    setFail(false)
  }

  function handleReload() {
    window.location.reload()
  }

  //点击垃圾桶按钮弹出确认modal
  function handleDelete(event) {
    console.log(event.currentTarget.id)
    setDeleteTool({
      status: true,
      name: event.currentTarget.id,
    })
    setErrorMsg(
      `Do you want to delete ${event.currentTarget.id} from tool box?`
    )
  }

  //   确认删除tool
  function deleteYes() {
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
  function handleTextField(event) {
    const { name, value } = event.target
    setTextInput(prevText => ({
      ...prevText,
      [name]: value,
    }))
  }

  // 管理项目的tool标签，点击添加按钮时会append到文本框下方
  function handleTool() {
    let toolInput = document.getElementById('project-tool-input').value
    if (toolInput === '') {
      setFail(true)
      setErrorMsg('Please add the tool you will use ヽ(￣д￣;)ノ')
    } else if (tool.includes(toolInput)) {
      setFail(true)
      setErrorMsg('You already included that tool... ヽ(￣д￣;)ノ')
    } else {
      setTool(prevTool => [...prevTool, toolInput])
    }

    document.getElementById('project-tool-input').value = ''
  }

  const toolList = tool.map(item => (
    <li key={item}>
      <i onClick={handleDelete} id={item} className="fas fa-trash-alt"></i>
      {item}
    </li>
  ))

  //管理项目进程 4个状态可选 默认In Progress
  function handleStatus(event) {
    setStatus(event.target.value)
  }

  //管理项目公开性 默认公开Public
  function handlePublic(event) {
    setPublicProject(event.target.checked)
  }

  //上传项目信息到云端
  function handleSave() {
    if (
      textInput.projectName === '' ||
      textInput.projectCategory === '' ||
      textInput.projectDesc === '' ||
      tool.length === 0
    ) {
      setFail(true)
      setErrorMsg('Please fill the information ヽ(￣д￣;)ノ')
    } else {
      //如果表格都填写
      setLoading(true)
      setTimeout(() => {
        let changedData = {
          Name: textInput.projectName,
          Date: textInput.projectDate,
          Category: textInput.projectCategory,
          Desc: textInput.projectDesc,
          Tools: tool,
          Status: status,
          Privacy: publicProject === true ? 'Public' : 'Private',
        }
        firebase.auth().onAuthStateChanged(user => {
          db.collection('user')
            .doc(user.uid)
            .collection('Project')
            .doc(params.ref)
            .update({
              projectData: changedData,
            })

          //写入到日志中
          db.collection('user')
            .doc(user.uid)
            .collection('Activity')
            .add({
              Key: params.ref,
              Time: currentTime,
              Content: `Edited project ${textInput.projectName}`,
            })

          //写入到公开数据库
          //如果改为公开项目 写入到公开集合
          if (publicProject) {
            db.collection('project')
              .doc(params.ref)
              .set({
                Key: params.ref,
                Public: true,
                Like: 0,
                Author: {
                  Id: user.uid,
                  Profile: props.profile,
                },
                changedData,
              })
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
        })
        setLoading(false)
        setFeedback(true)
      }, 2000)

      console.log('项目成功修改并保存到云端~ ୧(๑•̀⌄•́๑)૭✧')
    }
  }

  return (
    <div>
      {loading === true ? <Progress /> : null}

      {/* 项目创建成功反馈 */}
      {feedback === true ? (
        <div>
          <Feedback
            msg="Success"
            info="The project saved successfully ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            method="reload"
            toggle={handleReload}
          />
        </div>
      ) : null}

      {/* 项目缺少信息错误反馈 */}
      {fail === true ? (
        <Feedback
          msg="Error"
          info={errorMsg}
          imgUrl="/images/emoji/emoji_scare.png"
          method={'close'}
          toggle={handleFail}
        />
      ) : null}

      {/* 删除项目tool确认信息 */}
      {deleteTool.status === true ? (
        <Feedback
          msg="Confirm"
          info={errorMsg}
          imgUrl="/images/emoji/emoji_cry.png"
          method={'close'}
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
            <TextField
              id="project-category-input"
              name="projectCategory"
              onChange={handleTextField}
              label="Category"
              value={textInput.projectCategory}
              className={classes.textField}
              helperText="E.g. Web app, IOS app"
              margin="dense"
              variant="outlined"
            />

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
