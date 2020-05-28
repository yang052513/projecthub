import React from 'react'
import { Link } from 'react-router-dom'

function CreateBtn() {
  return (
    <div className="create-btn-container">
      <Link to="/create">
        <img src="/images/logo.png" alt="new project" />
      </Link>
    </div>
  )
}

export default CreateBtn
