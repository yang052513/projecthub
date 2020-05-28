import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Hitokoto from './Home/Hitokoto'
import Project from './Home/Project'
import CreateBtn from './Home/CreateBtn'

function Home() {
  const [status, setStatus] = useState('All My Projects')

  function handleStatus(event) {
    const { name, value } = event.target
    setStatus(value)
  }

  return (
    <div className="home-container component-layout">
      <Hitokoto />
      <div className="project-header-container">
        <h3>{status}</h3>
        <div className="project-header-filter">
          <select onChange={handleStatus} name="status">
            <option value="All My Projects">All My Projects</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planning">Planning</option>
            <option value="Dropped">Dropped</option>
          </select>

          <Link to="/create">
            <button>Create New Project</button>
          </Link>
        </div>
      </div>
      <Project filter={status} />
      <CreateBtn />
    </div>
  )
}

export default Home
