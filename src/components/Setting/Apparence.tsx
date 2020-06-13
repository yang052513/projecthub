import React from 'react'
import Theme from './Apparence/Theme'
import Background from './Apparence/Background'
import Opacity from './Apparence/Opacity'

interface Props {
  options: string | null | undefined
  demo: string | null | undefined
  customBg: string | null | undefined
  opacity: any
  switchImgPreview: any
  switchColorPreview: any
  switchOption: any
  switchTheme: any
  swicthOpacity: any
}

export const Apparence: React.FC<Props> = ({
  options,
  demo,
  customBg,
  opacity,
  switchTheme,
  switchOption,
  switchImgPreview,
  switchColorPreview,
  swicthOpacity,
}) => {
  return (
    <div>
      <div className="setting-content-intro">
        <h2>Apparence</h2>
        <p>Customize the apparence and preferrence</p>
      </div>
      <Theme switchTheme={switchTheme} />
      <Background
        options={options}
        demo={demo}
        customBg={customBg}
        switchImgPreview={switchImgPreview}
        switchColorPreview={switchColorPreview}
        switchOption={switchOption}
      />
      <Opacity opacity={opacity} swicthOpacity={swicthOpacity} />
    </div>
  )
}
