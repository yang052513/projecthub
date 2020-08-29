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
  tools: any
}

export const StatusTools: React.FC<Props> = ({ tools }) => {
  const toolList = tools.slice(0, 10)

  return (
    <div className="status-card-item-wrap">
      <h3>Most Used Technology</h3>

      <div className="status-card-container status-tag-container">
        {tools.length === 0 && <p className="status-no-log">暂无常用技术</p>}
        <ResponsiveContainer width={'90%'} height={300}>
          <BarChart data={toolList}>
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
