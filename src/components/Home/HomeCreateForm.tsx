import React, { useState, useContext } from 'react'

// Firebase API
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Modules Hooks
import { useHistory } from 'react-router-dom'
import { timeFormat } from 'current-time-format'
import { ProfileContext } from '../../context/ProfileContext'
import { addProjectLog, updateStatistics } from '../../modules/modules'
import { addProject } from '../../modules/home'

// Shared Components
import { Feedback } from '../shared/Feedback'
import { Progress } from '../shared/Progress'

// Material UI Components API
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '40ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const { year, monthNum, day } = timeFormat
const currentDay = `${year}-${monthNum}-${day}` // e.g. 2020-05-25

export const HomeCreateForm: React.FC = () => {
  const user: any = firebase.auth().currentUser
  const profile: any = useContext(ProfileContext)
  const history = useHistory()
  const classes = useStyles()

  // States
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<boolean>(false)
  const [fail, setFail] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const [textInput, setTextInput] = useState({
    projectName: '',
    projectDesc: '',
    projectDate: currentDay,
  })
  const [tool, setTool] = useState<any>([])
  const [status, setStatus] = useState('In Progress')
  const [publicProject, setPublicProject] = useState(true)
  const [category, setCategory] = useState<string>('Android')

  const handleFail = () => {
    setFail(false)
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
    //Empty text field
    toolInputTarget.value = ''
  }

  const toolList = tool.map((item: any) => <li key={item}>{item}</li>)

  //管理项目进程 4个状态可选 默认In Progress
  const handleStatus = (event: { target: { value: any } }) => {
    setStatus(event.target.value)
  }

  const handleCategory = (event: { target: { value: any } }) => {
    setCategory(event.target.value)
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
      textInput.projectDesc === '' ||
      tool.length === 0
    ) {
      setFail(true)
      setErrorMsg('Please fill the information ヽ(￣д￣;)ノ')
    } else {
      setLoading(true)
      setTimeout(() => {
        const projectData = {
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
          Contributors: [{ Avatar: profile.avatar, Id: user.uid }],
        }

        addProject(user.uid, projectData, publicProject)
        addProjectLog(
          user.uid,
          'Activity',
          profile.avatar,
          'You',
          'create a new project',
          textInput.projectName
        )
        updateStatistics(user.uid, status, 1)

        setLoading(false)
        setFeedback(true)
      }, 2000)
      console.log('项目成功保存到云端~ ୧(๑•̀⌄•́๑)૭✧')
    }
  }

  return (
    <div>
      {loading && <Progress />}

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
