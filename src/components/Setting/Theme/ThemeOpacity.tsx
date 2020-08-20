import React, { useContext } from 'react'
import { ThemeOpacitySlider } from './ThemeOpacitySlider'
import { ThemeContext } from '../../../context/ThemeContext'

export const ThemeOpacity: React.FC = () => {
  const theme: any = useContext(ThemeContext)

  return (
    <div className="setting-opacity-container">
      <h3 className="setting-content-subtit">Opacity</h3>
      <ThemeOpacitySlider
        opacity={theme.theme.opacity}
        switchOpacity={theme.handleOpacity}
      />
    </div>
  )
}
