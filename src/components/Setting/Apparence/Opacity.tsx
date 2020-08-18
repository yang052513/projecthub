import React, { useContext } from 'react'
import { OpacitySlider } from './OpacitySlider'
import { ThemeContext } from '../../../context/ThemeContext'

export const Opacity: React.FC = () => {
  const theme: any = useContext(ThemeContext)

  return (
    <div className="setting-opacity-container">
      <h3 className="setting-content-subtit">Opacity</h3>
      <OpacitySlider
        opacity={theme.theme.opacity}
        switchOpacity={theme.handleOpacity}
      />
    </div>
  )
}
