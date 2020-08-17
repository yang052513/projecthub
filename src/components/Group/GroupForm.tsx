import React, { useState } from 'react'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useFetchProfile } from '../Hooks/useFetchProfile'
import { Feedback } from '../Common/Feedback'
import { Progress } from '../Common/Progress'
import { useHistory } from 'react-router-dom'
import { addProjectLog } from '../../modules/modules'
import { FormControl, MenuItem, InputLabel, Select } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: '20px',
    width: '45ch',
  },
}))

export const GroupForm: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const user: firebase.User | null | any = firebase.auth().currentUser
  const profile = useFetchProfile(user.uid)

  const [progress, setProgress] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<any>({
    show: false,
    msg: '',
    info: '',
  })

  const [textInput, setTextInput] = useState({
    name: '',
    startDate: '',
    endDate: '',
    contributors: '',
    description: '',
  })

  const [category, setCategory] = useState<string>('Android')

  const [tool, setTool] = useState<Array<string>>([])

  const handleTextField = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setTextInput(prevText => ({
      ...prevText,
      [name]: value,
    }))
  }

  const handleCategory = (event: { target: { value: any } }) => {
    setCategory(event.target.value)
  }

  const handleTool = () => {
    let toolInputTarget: any = document.getElementById('project-tool-input')
    let toolInput = toolInputTarget.value

    if (toolInput === '') {
      alert('add the tool')
    } else if (tool.includes(toolInput)) {
      alert('already included ')
    } else {
      setTool((prevTool: any) => [...prevTool, toolInput])
      toolInputTarget.value = ''
    }
  }

  const handleSubmit = () => {
    setProgress(true)

    setTimeout(() => {
      let contributor_list: Array<Object> = [
        { Id: user.uid, Avatar: profile.avatar },
      ]
      for (let i = 1; i < parseInt(textInput.contributors); i++) {
        contributor_list.push({ Id: 'None', Avatar: 'None' })
      }

      firebase
        .firestore()
        .collection('group')
        .add({
          Creator: { Id: user.uid, Avatar: profile.avatar },
          Name: textInput.name,
          StartDate: textInput.startDate,
          EndDate: textInput.endDate,
          Category: category,
          Contributors: contributor_list,
          Description: textInput.description,
          Tools: tool,
          Capacity: parseInt(textInput.contributors) - 1,
        })
        .then(docRef => {
          firebase.firestore().collection('group').doc(docRef.id).update({
            Key: docRef.id,
          })
          console.log(`创建新的合作项目成功，密匙为${docRef.id}`)
        })

      addProjectLog(
        user.uid,
        'Activity',
        profile.avatar,
        'You',
        'created a new team project request',
        textInput.name
      )
      setProgress(false)
      setFeedback({
        show: true,
        msg: 'Project Created Successfully',
        info: 'Project are now availabe for everyone who wants to join!',
      })
    }, 1500)
  }

  const toolList = tool.map((item: any) => <li key={item}>{item}</li>)

  return (
    <div>
      <div className="project-form-container component-layout">
        <div className={classes.root}>
          <div>
            <div className="project-form-header-container">
              <h2>Create a New Project Working With Others</h2>
              <p>
                Create a new project request will display on the hall that
                everyone could apply to join your team! After created a project
                request, you can always edited by clicking the request
                management. button
              </p>
            </div>

            <TextField
              name="name"
              onChange={handleTextField}
              label="Project Name"
              style={{ margin: '8px 8px 20px 8px' }}
              placeholder="Enter your project name"
              helperText="Project name should be meaningful and memorable!"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              name="startDate"
              onChange={handleTextField}
              label="Estimated Start Date"
              type="date"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              name="endDate"
              onChange={handleTextField}
              label="Estimated End Date"
              type="date"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl
              variant="outlined"
              margin="dense"
              className={classes.textField}
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

            <TextField
              name="contributors"
              onChange={handleTextField}
              label="Team Size"
              type="number"
              placeholder="How many contributor needed?"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              name="description"
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

            <div className="project-tool-input-container">
              <TextField
                name="tools"
                id="project-tool-input"
                label="Required Technology"
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

            <div className="project-input-submit-container">
              <button onClick={() => history.push('/group')}>Cancel</button>
              <button onClick={handleSubmit}>Create Project</button>
            </div>
          </div>
        </div>
      </div>
      {feedback.show && (
        <Feedback
          msg={feedback.msg}
          info={feedback.info}
          imgUrl="/images/emoji/emoji_happy.png"
          toggle={() => history.push('/grouppost')}
        />
      )}

      {progress && <Progress />}
    </div>
  )
}
