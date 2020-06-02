import React from 'react'
import Theme from './Apparence/Theme'
import Background from './Apparence/Background'
import Opacity from './Apparence/Opacity'

export default function Apparence() {
  return (
    <div className="setting-content-container">
      <h2>Apparence</h2>
      <Theme />
      <Background />
      <Opacity />
    </div>
  )
}
