import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  tagSort: any
}

export const StatusTag: React.FC<Props> = ({ tagSort }) => {
  const tagList = tagSort.slice(0, 10)

  return (
    <div className="status-card-item-wrap">
      <h3>Most Used Technology</h3>

      <div className="status-card-container status-tag-container">
        <ResponsiveContainer width={'90%'} height={300}>
          <BarChart data={tagList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cnt" fill="#03a9f4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
