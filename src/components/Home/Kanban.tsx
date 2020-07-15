import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Board from 'react-trello'
import firebase from 'firebase'
import { Loading } from '../Common/Loading'

//初始化的看板模板
const data = {
  lanes: [
    {
      id: 'todo',
      title: 'To do',
      style: {
        width: 360,
      },
      cards: [],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      style: {
        width: 360,
      },
      cards: [],
    },
    {
      id: 'done',
      title: 'Done',
      style: {
        width: 360,
      },
      cards: [],
    },
    {
      id: 'bug',
      title: 'Bugs',
      style: {
        width: 360,
      },
      cards: [],
    },
  ],
}

export const Kanban: React.FC = () => {
  const params: any = useParams()
  const db = firebase.firestore()
  const user: any = firebase.auth().currentUser

  const [loading, setLoading] = useState<boolean>(false)

  const cardStyle = {
    minWidth: '340px',
    borderRadius: '6px',
  }

  //先初始化为空的列表
  const [kanban, setKanban] = useState({})

  //加载数据库，看是否有内容
  useEffect(() => {
    window.scrollTo(0, 0)
    if (user) {
      db.collection('user')
        .doc(user.uid)
        .collection('Project')
        .doc(params.ref)
        .get()
        .then((doc: any) => {
          if (doc.data().kanbanData) {
            setKanban(doc.data().kanbanData)
            setLoading(true)
            console.log('数据库有您的看板记录，将读取您的历史看板 ╰(*°▽°*)╯')
          } else {
            setKanban(data)
            setLoading(true)
            console.log('第一次使用看板，已经帮你配置好啦 ︿(￣︶￣)︿')
          }
        })
    }
  }, [db, params.ref, user])

  //添加新的卡片到列表中 保存到数据库
  const handleCardAdd = (card: any, laneId: any) => {
    console.log(`创建卡片成功 ${laneId}`)
    console.dir(card)
  }

  //任何改动更新到数据库
  const handleCardChange = (kanbanData: any) => {
    console.log(kanbanData)
    db.collection('user')
      .doc(user.uid)
      .collection('Project')
      .doc(params.ref)
      .update({
        kanbanData: kanbanData,
      })
  }

  return (
    <div className="kanban-container">
      {loading === true ? (
        <Board
          data={kanban}
          editable
          draggable
          onCardAdd={handleCardAdd}
          onDataChange={handleCardChange}
          style={{ background: 'none' }}
          cardStyle={cardStyle}
        />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Kanban
