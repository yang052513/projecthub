import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Board from 'react-trello'
import firebase from 'firebase'
import { Loading } from '../Common/Loading'
import { useFetchContributor } from '../../hooks/useFetchContributor'

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
  const user: any = firebase.auth().currentUser
  const [loading, setLoading] = useState<boolean>(false)
  const [kanban, setKanban] = useState({})
  const contributorList: any = useFetchContributor(user.uid, params.ref)

  const cardStyle = {
    minWidth: '340px',
    borderRadius: '6px',
  }

  //加载数据库，看是否有内容
  const fetchKanban = (): void => {
    window.scrollTo(0, 0)
    firebase
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Project')
      .doc(params.ref)
      .get()
      .then((doc: any) => {
        //数据库有看板历史记录
        if (doc.data().kanbanData) {
          setKanban(doc.data().kanbanData)
          setLoading(true)
          console.log('数据库有您的看板记录，将读取您的历史看板 ╰(*°▽°*)╯')
        } else {
          //加载看板模板 写入数据库
          setKanban(data)
          setLoading(true)
          console.log('第一次使用看板，已经帮你配置好啦 ︿(￣︶￣)︿')
        }
      })
  }
  useEffect(fetchKanban, [])

  //添加新的卡片到列表中 保存到数据库
  const handleCardAdd = (card: any, laneId: any) => {
    console.log(`创建卡片成功 ${laneId}`)
    console.dir(card)
  }

  //任何改动更新到数据库
  const handleCardChange = (kanbanData: any) => {
    //更新所有队伍中贡献者的看板数据
    contributorList.forEach((contributor: any) => {
      firebase
        .firestore()
        .collection('user')
        .doc(contributor.Id)
        .collection('Project')
        .doc(params.ref)
        .update({
          kanbanData: kanbanData,
        })
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
