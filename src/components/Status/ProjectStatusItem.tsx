import React from 'react'

interface Props {
  caption: string
  count: number | null | undefined
}

export const ProjectStatusItem: React.FC<Props> = ({ caption, count }) => {
  return (
    <div className="project-status-item-container">
      <h4>{caption}</h4>
      <p>{count}</p>
    </div>
  )
}
