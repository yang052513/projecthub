import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import FormControl from '@material-ui/core/FormControl'
// import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45ch',
  },
}))

export default function LayoutTextFields() {
  const classes = useStyles()

  return (
    <div className="project-form-container component-layout">
      <div className={classes.root}>
        <div>
          {/* 项目名称输入 */}
          <TextField
            id="project-name-input"
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
            label="Category"
            id="project-category-input"
            placeholder="Project category"
            className={classes.textField}
            helperText="E.g. Web app, IOS app"
            margin="dense"
            variant="outlined"
          />

          {/* 项目介绍输入 */}
          <TextField
            id="project-desc-input"
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
          <TextField
            label="Tools"
            id="project-tool-input"
            placeholder="Tools that used"
            className={classes.textField}
            helperText="Click add button to add more tools"
            margin="dense"
            variant="outlined"
          />

          <button className="project-add-tool-btn">Add</button>

          {/* <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={'33'}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
        </div>
      </div>
    </div>
  )
}
