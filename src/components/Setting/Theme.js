import React from 'react'
import ThemeSample from './ThemeSample'

export default function Theme() {
  return (
    <div className="setting-content-theme">
      <h3>Theme</h3>
      <div className="setting-content-theme-sample-wrap">
        <ThemeSample name={'Cobalt'} theme={'rgb(14,93,211)'} />
        <ThemeSample name={'Rose'} theme={'rgb(211,14,14)'} />
        <ThemeSample name={'Seafoam'} theme={'rgb(14,211,145)'} />
        <ThemeSample name={'Orchid'} theme={'rgb(122,14,211)'} />
        <ThemeSample name={'Fushcia'} theme={'rgb(211,14,168)'} />
        <ThemeSample name={'Tangerine'} theme={'rgb(211,86,14)'} />
      </div>
    </div>
  )
}
