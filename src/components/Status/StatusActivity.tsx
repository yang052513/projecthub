import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const inProgress = 'rgb(67, 219, 118)'
const completed = 'rgb(51, 196, 206)'
const planning = 'rgb(206, 51, 90)'
const dropped = 'rgb(128, 128, 128)'

const data = [
  {
    name: 'January',
    inProgress: 4,
    completed: 5,
    planning: 2,
    dropped: 0,
  },
  {
    name: 'February',
    inProgress: 2,
    completed: 4,
    planning: 0,
    dropped: 1,
  },
  {
    name: 'March',
    inProgress: 5,
    completed: 1,
    planning: 4,
    dropped: 3,
  },
  {
    name: 'April',
    inProgress: 3,
    completed: 6,
    planning: 2,
    dropped: 1,
  },
  {
    name: 'May',
    inProgress: 9,
    completed: 3,
    planning: 3,
    dropped: 1,
  },
  {
    name: 'June',
    inProgress: 1,
    completed: 5,
    planning: 4,
    dropped: 4,
  },
  // {
  //   name: 'July',
  //   inProgress: 3,
  //   completed: 2,
  //   planning: 1,
  //   dropped: 0,
  // },
  // {
  //   name: 'August',
  //   inProgress: 1,
  //   completed: 2,
  //   planning: 3,
  //   dropped: 4,
  // },
  // {
  //   name: 'September',
  //   inProgress: 3,
  //   completed: 1,
  //   planning: 5,
  //   dropped: 2,
  // },
  // {
  //   name: 'October',
  //   inProgress: 4,
  //   completed: 5,
  //   planning: 2,
  //   dropped: 0,
  // },
  // {
  //   name: 'November',
  //   inProgress: 2,
  //   completed: 1,
  //   planning: 4,
  //   dropped: 0,
  // },
  // {
  //   name: 'December',
  //   inProgress: 3,
  //   completed: 3,
  //   planning: 2,
  //   dropped: 4,
  // },
]

export const StatusActivity: React.FC = () => {
  return (
    <div className="status-card-item-wrap">
      <h3>Project Status Analysis</h3>

      <div className="status-card-container">
        <LineChart width={950} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax']} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="inProgress"
            stroke={inProgress}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="completed" stroke={completed} />
          <Line type="monotone" dataKey="planning" stroke={planning} />
          <Line type="monotone" dataKey="dropped" stroke={dropped} />
        </LineChart>
      </div>
    </div>
  )
}
