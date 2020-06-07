import React from 'react'
import OpacitySlider from './OpacitySlider'

export default function Opacity(props) {
  return (
    <div className="setting-opacity-container">
      <h3 className="setting-content-subtit">Opacity</h3>
      <OpacitySlider
        opacity={props.opacity}
        switchOpacity={props.swicthOpacity}
      />
    </div>
  )
}
