import React from 'react'
import { OpacitySlider } from './OpacitySlider'

interface Props {
  opacity: any
  swicthOpacity: any
}

export const Opacity: React.FC<Props> = ({ opacity, swicthOpacity }) => {
  return (
    <div className="setting-opacity-container">
      <h3 className="setting-content-subtit">Opacity</h3>
      <OpacitySlider opacity={opacity} switchOpacity={swicthOpacity} />
    </div>
  )
}
