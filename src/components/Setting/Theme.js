import React, { useState, useEffect } from 'react'
import { CirclePicker } from 'react-color'
export default function Theme() {
  const [color, setColor] = useState('#fff')

  function handleColor(color, event) {
    console.log(color)
  }
  return (
    <div className="setting-content-theme">
      <h3>Theme</h3>
      <CirclePicker width={'600px'} circleSize={50} onChange={handleColor} />
    </div>
  )
}
