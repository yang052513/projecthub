import React from 'react'

interface Props {
  backgroundColor: string
  opacity: number
}
export const ColorBackground: React.FC<Props> = ({
  backgroundColor,
  opacity,
}) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: backgroundColor,
          transition: 'all 2s',
        }}
        className="background"
      ></div>
      <div className="overlay" style={{ opacity: opacity / 100 }}></div>
    </div>
  )
}
