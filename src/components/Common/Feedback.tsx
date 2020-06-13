import React from 'react'

interface Props {
  imgUrl: string
  msg: string
  info: string
  confirm?: boolean | null | undefined
  toggle: any
  cancel?: any
}

export const Feedback: React.FC<Props> = ({
  imgUrl,
  msg,
  info,
  confirm,
  toggle,
  cancel,
}) => {
  return (
    <div className="feedback-container">
      <div>
        <img src={imgUrl} alt="feedback info" />
        <h3>{msg}</h3>
        <p>{info}</p>

        <button onClick={toggle}>Sure</button>

        {/* if need confirmation, open double confirm modal */}
        {confirm === true ? (
          <button style={{ marginLeft: '20px' }} onClick={cancel}>
            I guess No
          </button>
        ) : null}
      </div>
    </div>
  )
}
