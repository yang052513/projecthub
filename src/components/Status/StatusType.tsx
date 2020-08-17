import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  typeSort: any
}

const data = [
  {
    name: 'Android',
    cnt: 120,
  },
  {
    name: 'iOS',
    cnt: 98,
  },
  {
    name: 'PC/Mac',
    cnt: 86,
  },
  {
    name: 'Game',
    cnt: 99,
  },
  {
    name: 'Web',
    cnt: 85,
  },
  {
    name: 'Others',
    cnt: 65,
  },
]

export const StatusType: React.FC<Props> = ({ typeSort }) => {
  return (
    <div className="status-card-item-wrap">
      <h3>Project Categories</h3>

      <div className="status-card-container status-tag-container">
        <ResponsiveContainer width={'90%'} height={400}>
          <RadarChart outerRadius={150} width={400} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              dataKey="cnt"
              stroke="#03a9f4"
              fill="#03a9f4"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
