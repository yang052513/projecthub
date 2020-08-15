import React from 'react'

interface IColor {
  color: string
}

interface Props {
  caption: string
  count: number | null | undefined
  color: IColor
}

export const ProjectStatusItem: React.FC<Props> = ({
  caption,
  count,
  color,
}) => {
  return (
    <div style={color} className="project-status-item-container">
      <h4>{caption}</h4>
      <p>{count}</p>
    </div>
  )
}
