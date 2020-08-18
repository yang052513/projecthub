import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeHitokoto } from './HomeHitokoto'
import { HomeProject } from './HomeProject'
import { HomeCreateBtn } from './HomeCreateBtn'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      transform: 'translateY(-25px)',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectItem: {
      fontSize: '13px',
      color: 'black',
      fontFamily: 'quicksand',
    },
  })
)

export const Home: React.FC = () => {
  const classes = useStyles()

  const [sort, setSort] = useState<string>('Name')
  const [status, setStatus] = useState<string>('All My Projects')
  const [search, setSearch] = useState<string>('')

  const handleStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string)
  }

  function handleSort(event: React.ChangeEvent<{ value: unknown }>) {
    setSort(event.target.value as string)
  }

  function handleSearch(event: React.ChangeEvent<{ value: unknown }>) {
    setSearch(event.target.value as string)
  }

  return (
    <div className="home-container component-layout">
      <HomeHitokoto />

      <div className="project-header-container">
        <h3>{status}</h3>

        <div className="project-header-filter">
          {/* 搜索用户的项目 */}
          <label className="project-header-search">
            <i className="fas fa-search"></i>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="search your projects..."
            />
          </label>

          {/* 分类项目: status, name(A-Z), Date */}
          <FormControl className={classes.formControl}>
            <InputLabel id="project-sort-label">Sort</InputLabel>
            <Select
              className={classes.selectItem}
              labelId="project-sort"
              id="project-sort"
              value={sort}
              onChange={handleSort}
            >
              <MenuItem className={classes.selectItem} value={'Name'}>
                Name
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'Status'}>
                Status
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'Newest'}>
                Newest
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'Oldest'}>
                Oldest
              </MenuItem>
            </Select>
          </FormControl>

          {/* 根据项目的状态筛选 */}
          <FormControl className={classes.formControl}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              className={classes.selectItem}
              labelId="status-filter"
              id="status-filter"
              value={status}
              onChange={handleStatus}
            >
              <MenuItem
                className={classes.selectItem}
                value={'All My Projects'}
              >
                All My Projects
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'In Progress'}>
                In Progress
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'Completed'}>
                Completed
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'Planning'}>
                Planning
              </MenuItem>
              <MenuItem className={classes.selectItem} value={'Dropped'}>
                Dropped
              </MenuItem>
            </Select>
          </FormControl>

          <Link to="/create">
            <button>Create New Project</button>
          </Link>
        </div>
      </div>
      <HomeProject sort={sort} filter={status} search={search} />
      <HomeCreateBtn />
    </div>
  )
}
