import React from 'react'

interface Props {
  status: string
  info: string
  key: string
}
export const ChangeLogContent: React.FC<Props> = ({ status, info }) => {
  return (
    <p>
      <span>{status}</span>
      {info}
    </p>
  )
}
