import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const inProgress = 'rgb(67, 219, 118)'
const completed = 'rgb(51, 196, 206)'
const planning = 'rgb(206, 51, 90)'
const dropped = 'rgb(128, 128, 128)'

interface Props {
  statistics: any
}

export const StatusAnalysis: React.FC<Props> = ({ statistics }) => {
  return (
    <div className="status-card-item-wrap">
      <h3>Project Status Analysis</h3>

      <div className="status-card-container status-tag-container">
        <ResponsiveContainer width={'95%'} height={400}>
          <LineChart data={statistics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Label" />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="In Progress"
              stroke={inProgress}
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Completed" stroke={completed} />
            <Line type="monotone" dataKey="Planning" stroke={planning} />
            <Line type="monotone" dataKey="Dropped" stroke={dropped} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
