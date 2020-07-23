import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  // 文本框样式
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: '20px',
    width: '45ch',
  },
}))

export const GroupForm: React.FC = () => {
  const classes = useStyles()

  return (
    <div className="project-form-container component-layout">
      <div className={classes.root}>
        <div>
          <div className="project-form-header-container">
            <h2>Create a New Project Working With Others</h2>
            <p>
              Create a new project request will display on the hall that
              everyone could apply to join your team! After created a project
              request, you can always edited by clicking the request management.
              button
            </p>
          </div>

          <TextField
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

          <TextField
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
              label="Required Technology"
              placeholder="Tools that used"
              className={classes.textField}
              helperText="Click add button to add more tools"
              margin="dense"
              variant="outlined"
            />

            <button className="project-add-tool-btn">Add</button>
            <ul></ul>
          </div>

          <div className="project-input-submit-container">
            <button>Create Project</button>
          </div>
        </div>
      </div>
    </div>
  )
}
