import React from 'react'
import Theme from './Apparence/Theme'
import Background from './Apparence/Background'
import Opacity from './Apparence/Opacity'

export default function Apparence(props) {
  return (
    <div>
      <div className="setting-content-intro">
        <h2>Apparence</h2>
        <p>Customize the apparence and preferrence</p>
      </div>
      <Theme />
      <Background switchImgPreview={props.switchImgPreview} />
      <Opacity />
    </div>
  )
}
