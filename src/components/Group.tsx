import React from 'react'
import { Link } from 'react-router-dom'

export const Group: React.FC = () => {
  return (
    <div className="group-container component-layout">
      <Link to="/request">
        <button>Create A Request</button>
      </Link>

      <button>My Request</button>
    </div>
  )
}
