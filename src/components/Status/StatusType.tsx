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
  category: any
}

export const StatusType: React.FC<Props> = ({ category }) => {
  const data = [
    {
      name: 'Android',
      cnt: category['Android'],
    },
    {
      name: 'IOS',
      cnt: category['IOS'],
    },
    {
      name: 'PC/Mac',
      cnt: category['PC/Mac'],
    },
    {
      name: 'Game',
      cnt: category['Game'],
    },
    {
      name: 'Web',
      cnt: category['Web'],
    },
    {
      name: 'Others',
      cnt: category['Others'],
    },
  ]
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
