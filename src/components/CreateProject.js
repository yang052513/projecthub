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
import Progress from './Progress'

const useStyles = makeStyles((theme) => ({
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

export default function CreateProject() {
  const classes = useStyles()
  const db = firebase.firestore()

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [fail, setFail] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  //当前的时间 年-月-日格式
  const date = new Date()
  const currentDay = `${date.getFullYear()}-${
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

  const [textInput, setTextInput] = useState({
    projectName: '',
    projectCategory: '',
    projectDesc: '',
    projectDate: currentDay,
  })
  const [tool, setTool] = useState([])
  const [status, setStatus] = useState('In Progress')
  const [publicProject, setPublicProject] = useState(true)

  function handleFail() {
    setFail(false)
  }

  function handleReload() {
    window.location.reload()
  }

  //管理普通文本输入，名称，简介，分类
  function handleTextField(event) {
    const { name, value } = event.target
    setTextInput((prevText) => ({
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
      setTool((prevTool) => [...prevTool, toolInput])
    }

    document.getElementById('project-tool-input').value = ''
  }

  const toolList = tool.map((item) => <li key={item}>{item}</li>)

  //管理项目进程 4个状态可选 默认In Progress
  function handleStatus(event) {
    setStatus(event.target.value)
  }

  //管理项目公开性 默认公开Public
  function handlePublic(event) {
    setPublicProject(event.target.checked)
  }

  //上传项目信息到云端
  function handleSubmit() {
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
        let projectData = {
          Name: textInput.projectName,
          Date: textInput.projectDate,
          Category: textInput.projectCategory,
          Desc: textInput.projectDesc,
          Tools: tool,
          Status: status,
          Privacy: publicProject === true ? 'Public' : 'Private',
        }
        firebase.auth().onAuthStateChanged((user) => {
          db.collection('user')
            .doc(user.uid)
            .collection('Project')
            .add({
              projectData,
            })
            .then((docRef) => {
              console.log(docRef.id)
              //将项目的密匙写入到文档中
              db.collection('user')
                .doc(user.uid)
                .collection('Project')
                .doc(docRef.id)
                .update({
                  Key: docRef.id,
                })
            })
            .catch((error) => {
              console.log(`上传失败${error}`)
            })
        })
        setLoading(false)
        setFeedback(true)
      }, 2000)

      console.log('项目成功保存到云端~ ୧(๑•̀⌄•́๑)૭✧')
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
            info="Project created successfully~ ー( ´ ▽ ` )ﾉ"
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

      {/* 项目表单信息容器 */}
      <div className="project-form-container component-layout">
        <div className={classes.root}>
          <div>
            <div className="project-form-header-container">
              <h2>Create a New Project</h2>
              <p>
                Create a new project will displayed on the home main dashboard
                that allows you manage your project easily
              </p>
            </div>

            {/* 项目名称输入 */}
            <TextField
              id="project-name-input"
              name="projectName"
              onChange={handleTextField}
              label="Project Name"
              style={{ margin: 8 }}
              placeholder="Enter your project name"
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
              defaultValue={currentDay}
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
              placeholder="Project category"
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
              placeholder="What does you project for?"
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
              <button onClick={handleSubmit}>Create Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
