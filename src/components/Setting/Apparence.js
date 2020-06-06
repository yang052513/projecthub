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
      <Background
        options={props.options}
        demo={props.demo}
        customBg={props.customBg}
        switchImgPreview={props.switchImgPreview}
        switchColorPreview={props.switchColorPreview}
        switchOption={props.switchOption}
      />
      <Opacity />
    </div>
  )
}
