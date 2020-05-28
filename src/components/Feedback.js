import React from 'react'

function Feedback(props) {
  return (
    <div className="feedback-container">
      <div>
        <img src={props.imgUrl} alt="feedback info" />
        <h3>{props.msg}</h3>
        <p>{props.info}</p>
        <button onClick={props.toggle}>OK</button>
      </div>
    </div>
  )
}

export default Feedback
