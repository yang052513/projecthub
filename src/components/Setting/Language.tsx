import React from 'react'
import { SelectLang } from './Language/SelectLang'

export const Language: React.FC = () => {
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

export default Language
