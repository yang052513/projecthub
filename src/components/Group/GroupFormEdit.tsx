import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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

export const GroupFormEdit: React.FC = () => {
  const params: any = useParams()
  const classes = useStyles()

  const [textInput, setTextInput] = useState<any>({
    name: '',
    startDate: '',
    endDate: '',
    category: '',
    contributors: '',
    description: '',
  })

  const [tool, setTool] = useState<Array<string>>([])

  const fetchGroupDoc = () => {
    firebase
      .firestore()
      .collection('group')
      .doc(params.ref)
      .get()
      .then((doc: any) => {
        setTextInput({
          name: doc.data().Name,
          startDate: doc.data().StartDate,
          endDate: doc.data().EndDate,
          category: doc.data().Category,
          description: doc.data().Description,
          contributor: parseInt(doc.data().Contributors.length),
          capacity: parseInt(doc.data().Capacity),
        })
        setTool(doc.data().Tools)
      })
  }

  useEffect(fetchGroupDoc, [])

  const handleTextField = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setTextInput((prevText: any) => ({
      ...prevText,
      [name]: value,
    }))
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
    firebase.firestore().collection('group').doc(params.ref).update({
      Name: textInput.name,
      Description: textInput.description,
      StartDate: textInput.startDate,
      EndDate: textInput.endDate,
      Tools: tool,
    })
  }

  const toolList = tool.map((item: any) => <li key={item}>{item}</li>)

  return (
    <div className="project-form-container component-layout">
      <div className={classes.root}>
        <div>
          <div className="project-form-header-container">
            <h2>Edit The Project</h2>
            <p>
              Once you finish the editing, the project changes will be applied
              to all the contributors who already joined the team.
            </p>
          </div>

          <TextField
            name="name"
            value={textInput.name}
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
            value={textInput.startDate}
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
            value={textInput.endDate}
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

          <TextField
            name="category"
            value={textInput.category}
            onChange={handleTextField}
            label="Category"
            placeholder="Project category"
            className={classes.textField}
            helperText="E.g. Web app, IOS app"
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* 如果改成的数字小于当前team的规模，alert 否则写入数据库更新 */}
          <TextField
            name="contributors"
            onChange={handleTextField}
            label="Contributors Needed"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            name="description"
            value={textInput.description}
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
            <button onClick={handleSubmit}>Create Project</button>
          </div>
        </div>
      </div>
    </div>
  )
}
