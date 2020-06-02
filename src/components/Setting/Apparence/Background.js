import React from 'react'

export default function Background() {
  return (
    <div className="setting-content-background">
      <h3>Background</h3>
      <div className="setting-content-background-demo">
        <img src="/images/theme/background/demo.png" alt="ad" />
      </div>

      <p>Choose Background</p>
      <div className="setting-content-background-options">
        <img src="/images/theme/background/1.jpg" />
      </div>
      <button>Upload</button>
    </div>
  )
}
