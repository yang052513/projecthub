import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const kanbanData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      tasks: [
        { id: 'task-1', content: 'Take out the garbage' },
        { id: 'task-2', content: 'Watch my show' },
      ],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Charge my phone' },
        { id: 'task-4', content: 'Cook dinner' },
      ],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      tasks: [
        { id: 'task-5', content: 'Workout' },
        { id: 'task-6', content: 'Homework' },
      ],
    },
  },
}

//重新排序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

//移动内容到其他列
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

// 样式化
const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? 'lightgreen' : 'grey',

  ...draggableStyle,
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

function Kanban(props) {
  const [state, setState] = useState([
    kanbanData.columns['column-2'].tasks,
    kanbanData.columns['column-2'].tasks,
    kanbanData.columns['column-3'].tasks,
  ])
  console.log(kanbanData)

  function onDragEnd(result) {
    const { source, destination } = result
    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index)
      const newState = [...state]
      newState[sInd] = items
      setState(newState)
    } else {
      const result = move(state[sInd], state[dInd], source, destination)
      const newState = [...state]
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      setState(newState.filter((group) => group.length))
    }
  }

  return (
    <div className="kanban-container">
      <button
        type="button"
        onClick={() => {
          setState([...state, []])
        }}
      >
        Create a new column
      </button>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((element, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {element.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="kanban-item-container"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="kanban-item">{item.content}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Kanban
