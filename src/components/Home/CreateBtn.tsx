import React from 'react'
import { Link } from 'react-router-dom'

export const CreateBtn: React.FC = () => {
  return (
    <div className="create-btn-container">
      <Link to="/create">
        <img src="/images/logo.png" alt="new project" />
      </Link>
    </div>
  )
}
