import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Board from 'react-trello'
import firebase from 'firebase'

//初始化所有数据
const data = {
  lanes: [
    {
      id: 'todo',
      title: 'To do',
      label: '20/70',
      style: {
        width: 300,
      },
      cards: [],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      label: '10/20',
      style: {
        width: 300,
      },
      cards: [],
    },

    {
      id: 'done',
      title: 'Done',
      style: {
        width: 300,
      },
      label: '2/5',
      cards: [],
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

function Kanban() {
  const params = useParams()
  const db = firebase.firestore()

  //先初始化为空的列表
  const [kanban, setKanban] = useState(data)

  //加载数据库，看是否有内容
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .doc(params.ref)
        .get()
        .then((doc) => {
          if (doc.data().kanbanData) {
            setKanban(doc.data().kanbanData)
            console.log('有保存记录')
          } else {
            setKanban(data)
            console.log('第一次用kanban')
          }
        })
    })
  }, [])

  //添加新的卡片到列表中 保存到数据库
  function handleCardAdd(card, laneId) {
    console.log(`创建卡片成功 ${laneId}`)
    console.dir(card)
  }

  //任何改动更新到数据库
  function handleCardChange(kanbanData) {
    console.log('卡片移动成功')

    setKanban(kanbanData)
    console.log(kanbanData)
    firebase.auth().onAuthStateChanged((user) => {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .doc(params.ref)
        .update({
          kanbanData,
        })
    })
  }

  return (
    <div className="kanban-container">
      <Board
        data={kanban}
        editable
        draggable
        onCardAdd={handleCardAdd}
        onDataChange={handleCardChange}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
    </div>
  )
}

export default Kanban
