import React from 'react'
import { StatusHeaderItem } from './StatusHeaderItem'

const defaultStyle = {
  color: '#4a4a4a',
}
const completedStyle = {
  color: 'rgb(51, 196, 206)',
}
const inprogressStyle = {
  color: 'rgb(67, 219, 118)',
}
const planningStyle = {
  color: 'rgb(206, 51, 90)',
}
const droppedStyle = {
  color: 'rgb(128, 128, 128)',
}

interface Props {
  project: any
}

export const StatusHeader: React.FC<Props> = ({ project }) => {
  const completed = project.filter((item: any) => item.Status === 'Completed')
  const inprogress = project.filter(
    (item: any) => item.Status === 'In Progress'
  )
  const planning = project.filter((item: any) => item.Status === 'Planning')
  const dropped = project.filter((item: any) => item.Status === 'Dropped')

  return (
    <div className="project-status-container">
      <StatusHeaderItem
        caption="Total Projects"
        count={project.length}
        color={defaultStyle}
      />
      <StatusHeaderItem
        caption="Completed"
        count={completed.length}
        color={completedStyle}
      />
      <StatusHeaderItem
        caption="In Progress"
        count={inprogress.length}
        color={inprogressStyle}
      />
      <StatusHeaderItem
        caption="Planning"
        count={planning.length}
        color={planningStyle}
      />
      <StatusHeaderItem
        caption="Dropped"
        count={dropped.length}
        color={droppedStyle}
      />
    </div>
  )
}
