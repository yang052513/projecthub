import React from 'react'

import { ThemeColor, ThemeBackground, ThemeOpacity } from './Theme/index'

export const SettingTheme: React.FC = () => {
  return (
    <div>
      <div className="setting-content-intro">
        <h2>Apparence</h2>
        <p>Customize the apparence and preferrence</p>
      </div>
      <ThemeColor />
      <ThemeBackground />
      <ThemeOpacity />
    </div>
  )
}
