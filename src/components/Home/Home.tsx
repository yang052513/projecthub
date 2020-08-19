import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeHitokoto, HomeProject, HomeCreateBtn } from './index'

// Material UI Components API
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
  const [project, setProject] = useState({
    sort: 'Name',
    status: 'All My Projects',
    search: '',
  })

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setProject({
      ...project,
      [name]: value,
    })
  }

  return (
    <div className="home-container component-layout">
      {/* 每日一言 */}
      <HomeHitokoto />

      {/* 过滤 排序项目 */}
      <div className="project-header-container">
        <h3>{project.status}</h3>
        <div className="project-header-filter">
          {/* 搜索用户的项目 */}
          <label className="project-header-search">
            <i className="fas fa-search"></i>
            <input
              name={'search'}
              onChange={handleChange}
              type="text"
              placeholder="search your projects..."
            />
          </label>

          {/* 分类项目: status, name(A-Z), Date */}
          <FormControl className={classes.formControl}>
            <InputLabel>Sort</InputLabel>
            <Select
              name={'sort'}
              className={classes.selectItem}
              value={project.sort}
              onChange={handleChange}
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
            <InputLabel>Status</InputLabel>
            <Select
              name={'status'}
              className={classes.selectItem}
              value={project.status}
              onChange={handleChange}
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

      {/* 渲染项目列表 */}
      <HomeProject
        sort={project.sort}
        filter={project.status}
        search={project.search}
      />

      {/* 创建新的项目 */}
      <HomeCreateBtn />
    </div>
  )
}
