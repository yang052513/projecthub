import React from 'react'
import { Link } from 'react-router-dom'

// 图像
import logo from '../../assets/images/logo.png'

export const HomeCreateBtn: React.FC = () => {
  return (
    <div className="create-btn-container">
      <Link to="/create">
        <img src={logo} alt="Create a new project" />
      </Link>
    </div>
  )
}
