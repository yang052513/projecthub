import React from 'react'

export default function ChangeLogContent(props) {
  return (
    <p>
      <span>{props.status}</span>
      {props.info}
    </p>
  )
}
