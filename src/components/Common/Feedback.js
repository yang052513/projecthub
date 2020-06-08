import React from 'react'

function Feedback(props) {
  return (
    <div className="feedback-container">
      <div>
        <img src={props.imgUrl} alt="feedback info" />
        <h3>{props.msg}</h3>
        <p>{props.info}</p>
        <button onClick={props.toggle}>Sure</button>
        {props.confirm === true ? (
          <button style={{ marginLeft: '20px' }} onClick={props.cancel}>
            I guess No
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Feedback
