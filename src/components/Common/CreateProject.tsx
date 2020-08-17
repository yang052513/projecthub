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
import { useHistory } from 'react-router-dom'
import { timeFormat } from 'current-time-format'

import { Feedback } from './Feedback'
import { Progress } from './Progress'

import { useFetchProfile } from '../Hooks/useFetchProfile'

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

//当前的时间 年-月-日格式
const { year, monthNum, monthStrLong, day, hours, minutes } = timeFormat

const currentDay = `${year}-${monthNum}-${day}`
const currentTime = `${monthStrLong} ${day} ${hours}:${minutes}`

const date = new Date()
const currentMonth: any =
  date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()

export const CreateProject: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const [loading, setLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<boolean>(false)
  const [fail, setFail] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const [statusCnt, setStatusCnt] = useState<any>()

  const [textInput, setTextInput] = useState({
    projectName: '',
    projectCategory: '',
    projectDesc: '',
    projectDate: currentDay,
  })
  const [tool, setTool] = useState<any>([])
  const [status, setStatus] = useState('In Progress')
  const [publicProject, setPublicProject] = useState(true)

  function handleFail() {
    setFail(false)
  }

  //管理普通文本输入，名称，简介，分类
  function handleTextField(event: { target: { name: any; value: any } }) {
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
    //Empty text field
    toolInput = ''
  }

  const toolList = tool.map((item: any) => <li key={item}>{item}</li>)

  //管理项目进程 4个状态可选 默认In Progress
  const handleStatus = (event: { target: { value: any } }) => {
    setStatus(event.target.value)
  }

  //管理项目公开性 默认公开Public
  const handlePublic = (event: {
    target: { checked: React.SetStateAction<boolean> }
  }) => {
    setPublicProject(event.target.checked)
  }

  //上传项目信息到云端
  const handleSubmit = () => {
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
        //Project Document Data
        let projectData = {
          Creator: {
            Avatar: profile.avatar,
            Id: user.uid,
          },
          Public: publicProject,
          Like: 0,
          Name: textInput.projectName,
          Status: status,
          Category: textInput.projectCategory,
          StartDate: textInput.projectDate,
          EndDate: '',
          Description: textInput.projectDesc,
          Tools: tool,
          Privacy: publicProject === true ? 'Public' : 'Private',
          Contributors: [{ Avatar: profile.avatar, Id: user.uid }],
        }

        //Save the project document to user's Project collection
        db.collection('user')
          .doc(user.uid)
          .collection('Project')
          .add(projectData)
          .then(docRef => {
            //Update the project Uid Key to document
            db.collection('user')
              .doc(user.uid)
              .collection('Project')
              .doc(docRef.id)
              .update({
                Key: docRef.id,
              })

            // 写入到Log集合中：创建新的项目
            db.collection('user')
              .doc(user.uid)
              .collection('Activity')
              .add({
                Avatar: profile.avatar,
                Message: {
                  Name: 'You',
                  Action: 'create a new project',
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

            //写入到统计集合中

            db.collection('user')
              .doc(user.uid)
              .collection('Statistics')
              .doc(currentMonth)
              .update({
                [`${status}`]: firebase.firestore.FieldValue.increment(1),
              })

            //Write the project to public project collection: Explore Component
            if (publicProject) {
              db.collection('project').doc(docRef.id).set(projectData)
              db.collection('project').doc(docRef.id).update({ Key: docRef.id })
            }
          })
          .catch(error => {
            console.log(`上传失败${error}`)
          })
        setLoading(false)
        setFeedback(true)
      }, 2000)

      console.log('项目成功保存到云端~ ୧(๑•̀⌄•́๑)૭✧')
    }
  }

  return (
    <div>
      {/* Loading Animation While Writing Data to Firestore */}
      {loading && <Progress />}

      {/* Display Success Feedback Modal Once Created Project */}
      {feedback && (
        <div>
          <Feedback
            msg="Success"
            info="Project created successfully~ ー( ´ ▽ ` )ﾉ"
            imgUrl="/images/emoji/emoji_happy.png"
            toggle={() => history.push('/')}
          />
        </div>
      )}

      {/* Project Input Missing Field Error Modal */}
      {fail && (
        <Feedback
          msg="Error"
          info={errorMsg}
          imgUrl="/images/emoji/emoji_scare.png"
          toggle={handleFail}
        />
      )}

      {/* Project Form Input Container */}
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

            {/* Project Name */}
            <TextField
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
