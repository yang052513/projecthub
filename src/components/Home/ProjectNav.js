import React from 'react'

function ProjectNav() {
  return (
    <div className="project-header-container">
      <h3>All My Projects</h3>
      <div className="project-header-filter">
        <select>
          <option>All My Projects</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Planning</option>
          <option>Dropped</option>
        </select>
        <button>Create New Project</button>
      </div>
    </div>
  )
}

export default ProjectNav
