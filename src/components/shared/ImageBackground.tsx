import React from 'react'

interface Props {
  backgroundUrl: string
  opacity: number
}

export const ImageBackground: React.FC<Props> = ({
  backgroundUrl,
  opacity,
}) => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        className="background-img"
      ></div>
      <div className="overlay" style={{ opacity: opacity / 100 }}></div>
    </div>
  )
}
