import React, { useState, useEffect } from 'react'
import { CirclePicker } from 'react-color'
import firebase from 'firebase'

export default function Theme(props) {
  const db = firebase.firestore()

  return (
    <div className="setting-content-theme">
      <h3 className="setting-content-subtit">Theme</h3>
      <CirclePicker
        id="sdasdasdasd"
        colors={[
          '#0e5dd3',
          '#3f51b5',
          '#2196f3',
          '#03a9f4',
          '#00bcd4',
          '#009688',
          '#4caf50',
          '#8bc34a',
          '#cddc39',
          '#ffeb3b',
          '#ffc107',
          '#ff9800',
          '#ff5722',
          '#795548',
          '#607d8b',
          '#e91e63',
          '#9c27b0',
          '#673ab7',
        ]}
        width={'600px'}
        circleSize={50}
        onChange={props.switchTheme}
      />
    </div>
  )
}
