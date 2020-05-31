import React, { Component, useState } from 'react'
import Board from 'react-trello'

const data = {
  lanes: [
    {
      id: 'PLANNED',
      title: 'Plannedss Tasks',
      label: '20/70',
      style: {
        width: 280,
      },
      cards: [
        {
          id: 'Milk',
          title: 'Buy milk',
          label: '15 mins',
          description: '2 Gallons of milk at the Deli store',
        },
        {
          id: 'Plan2',
          title: 'Dispose Garbage',
          label: '10 mins',
          description: 'Sort out recyclable and waste as needed',
        },
      ],
    },
    {
      id: 'WIP',
      title: 'Work In Progress',
      label: '10/20',
      style: {
        width: 280,
      },
      cards: [
        {
          id: 'Wip1',
          title: 'Clean House',
          label: '30 mins',
          description:
            'Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses',
        },
      ],
    },

    {
      id: 'COMPLETED',
      title: 'Completed',
      style: {
        width: 280,
      },
      label: '2/5',
      cards: [
        {
          id: 'Completed1',
          title: 'Practice Meditation',
          label: '15 mins',
          description: 'Use Headspace app',
        },
        {
          id: 'Completed2',
          title: 'Maintain Daily Journal',
          label: '15 mins',
          description: 'Use Spreadsheet for now',
        },
      ],
    },
  ],
}

//拖动某个项目
const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

//结束并释放某个项目
const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

class Kanban extends Component {
  state = { boardData: { lanes: [] } }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
    console.log(response)
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  render() {
    return (
      <div className="kanban-container">
        <Board
          data={this.state.boardData}
          editable
          draggable
          onCardAdd={this.handleCardAdd}
          onDataChange={this.shouldReceiveNewData}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
    )
  }
}

export default Kanban
