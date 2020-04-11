import React, { Component } from "react"
import StatusUnit from "./StatusUnit"

class Status extends Component {
  render() {
    return (
      <div className="status-container">
        <StatusUnit
          caption="Total project"
          count={123}
          lineColor={{ color: "red" }}
        />
        <StatusUnit
          caption="Completed:"
          count={89}
          lineColor={{ color: "blue" }}
        />
        <StatusUnit
          caption="In progress"
          count={10}
          lineColor={{ color: "purple" }}
        />
        <StatusUnit
          caption="Planning"
          count={5}
          lineColor={{ color: "green" }}
        />
        <StatusUnit
          caption="Dropped"
          count={13}
          lineColor={{ color: "yellow" }}
        />
        <StatusUnit
          caption="Out of schedule"
          count={19}
          lineColor={{ color: "orange" }}
        />
      </div>
    )
  }
}

export default Status
