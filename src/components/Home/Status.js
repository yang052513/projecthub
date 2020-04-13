import React, { Component } from "react"
import StatusUnit from "./StatusUnit"

class Status extends Component {
  render() {
    return (
      <div className="status-container">
        <StatusUnit
          caption="Total project"
          count={this.props.total}
          lineColor={{ color: "red" }}
        />
        <StatusUnit
          caption="Completed:"
          count={this.props.completed}
          lineColor={{ color: "blue" }}
        />
        <StatusUnit
          caption="In progress"
          count={this.props.inprogress}
          lineColor={{ color: "purple" }}
        />
        <StatusUnit
          caption="Planning"
          count={this.props.planning}
          lineColor={{ color: "green" }}
        />
        <StatusUnit
          caption="Dropped"
          count={this.props.dropped}
          lineColor={{ color: "yellow" }}
        />
        <StatusUnit
          caption="Out of schedule"
          count={this.props.outschedule}
          lineColor={{ color: "orange" }}
        />
      </div>
    )
  }
}

export default Status
