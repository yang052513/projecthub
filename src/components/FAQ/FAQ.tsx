import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

export const FAQ: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <div className="component-layout">
      <ul>
        <li>机器人API疑难解答</li>
        <li>app所有相关FAQ</li>
        <li>搜索功能</li>
      </ul>
    </div>
  )
}
