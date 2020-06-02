import React from 'react'
import Theme from './Apparence/Theme'
import Background from './Apparence/Background'
import Opacity from './Apparence/Opacity'

export default function Apparence() {
  return (
    <div className="setting-content-container">
      <div className="setting-content-intro">
        <h2>Apparence</h2>
        <p>Customize the apparence and preferrence</p>
      </div>
      <Theme />
      <Background />
      <Opacity />
    </div>
  )
}
