import React from "react"

function StatusUnit(props) {
  return (
    <div className="collection-unit">
      <p className="collection-caption">{props.caption} </p>
      <p className="collection-count">
        <span style={props.lineColor} className="collection-line">
          |
        </span>
        {props.count}
      </p>
    </div>
  )
}

export default StatusUnit
