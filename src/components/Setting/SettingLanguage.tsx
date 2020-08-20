import React from 'react'
import { SelectLang } from './Language/SelectLang'

export const SettingLanguage: React.FC = () => {
  return (
    <div>
      <div className="setting-content-intro">
        <h2>Language</h2>
        <p>Change the dispaly language</p>
      </div>
      <SelectLang />
    </div>
  )
}
