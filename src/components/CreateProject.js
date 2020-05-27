import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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

  const [textInput, setTextInput] = useState({
    projectName: '',
    projectCategory: '',
    projectDesc: '',
  })
  const [tool, setTool] = useState([])
  const [status, setStatus] = useState('In Progress')
  const [publicProject, setPublicProject] = useState(true)

  //管理普通文本输入，名称，简介，分类
  function handleTextField(event) {
    const { name, value } = event.target
    setTextInput((prevText) => ({
      ...prevText,
      [name]: value,
    }))
    console.log(textInput)
  }

  // 管理项目的tool标签，点击添加按钮时会append到文本框下方
  function handleTool() {
    let toolInput = document.getElementById('project-tool-input').value
    setTool((prevTool) => [...prevTool, toolInput])

    document.getElementById('project-tool-input').value = ''
  }
  const toolList = tool.map((item) => <li>{item}</li>)

  //管理项目进程 4个状态可选 默认In Progress
  function handleStatus(event) {
    setStatus(event.target.value)
  }

  //管理项目公开性 默认公开Public
  function handlePublic(event) {
    setPublicProject(event.target.checked)
  }

  return (
    <div className="project-form-container component-layout">
      <div className={classes.root}>
        <div>
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
            label="Create Date"
            type="date"
            defaultValue="2017-05-24"
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
                By enable private, your project will only be visible to yourself
              </p>
            )}
          </div>

          <div className="project-input-submit-container">
            <button>Create Project</button>
          </div>
        </div>
      </div>
    </div>
  )
}
