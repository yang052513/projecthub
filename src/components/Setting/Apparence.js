import React from 'react'
import Theme from './Apparence/Theme'
import Background from './Apparence/Background'
export default function Apparence() {
  return (
    <div className="setting-content-container">
      <h2>Apparence</h2>
      <Theme />
      <Background />
      <h3>Opacity</h3>
    </div>
  )
}
