import React from 'react'

export default function Flag(props) {
  return (
    <div className="setting-content-country-flag">
      <p>{props.country}</p>
      <img src={props.flag} alt="flag" />
    </div>
  )
}
