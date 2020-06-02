import React from 'react'

export default function ThemeSample(props) {
  const bgColor = {
    backgroundColor: props.theme,
  }
  return (
    <div className="setting-content-theme-sample">
      <div style={bgColor}></div>
      <p>{props.name}</p>
    </div>
  )
}
