import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hitokoto from './Home/Hitokoto'
import Project from './Home/Project'
import CreateBtn from './Home/CreateBtn'

import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    transform: 'translateY(-25px)',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function Home() {
  const classes = useStyles()

  const [status, setStatus] = useState('All My Projects')
  const [sort, setSort] = useState('projectData.Name')

  function handleStatus(event) {
    const { value } = event.target
    setStatus(value)
  }

  function handleSort(event) {
    setSort(event.target.value)
  }

  return (
    <div className="home-container component-layout">
      <Hitokoto />
      <div className="project-header-container">
        <h3>{status}</h3>

        <div className="project-header-filter">
          {/* 分类项目: status, name(A-Z), Date */}
          <FormControl className={classes.formControl}>
            <InputLabel id="project-sort-label">Sort</InputLabel>
            <Select
              labelId="project-sort"
              id="project-sort"
              value={sort}
              onChange={handleSort}
            >
              <MenuItem value={'projectData.Name'}>Name</MenuItem>
              <MenuItem value={'projectData.Status'}>Status</MenuItem>
              <MenuItem value={'projectData.Date'}>Date</MenuItem>
            </Select>
          </FormControl>

          {/* 根据项目的状态筛选 */}
          <FormControl className={classes.formControl}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter"
              id="status-filter"
              value={status}
              onChange={handleStatus}
            >
              <MenuItem value={'All My Projects'}>All My Projects</MenuItem>
              <MenuItem value={'In Progress'}>In Progress</MenuItem>
              <MenuItem value={'Completed'}>Completed</MenuItem>
              <MenuItem value={'Planning'}>Planning</MenuItem>
              <MenuItem value={'Dropped'}>Dropped</MenuItem>
            </Select>
          </FormControl>

          <Link to="/create">
            <button>Create New Project</button>
          </Link>
        </div>
      </div>
      <Project sort={sort} filter={status} />
      <CreateBtn />
    </div>
  )
}

export default Home
