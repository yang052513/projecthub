import firebase from 'firebase'
import { timeFormat } from 'current-time-format'

export function addNotification(
  userRef: string,
  message: string,
  category: string,
  redirect: string,
  avatar: string
) {
  const { monthStrLong, day, hours, minutes } = timeFormat

  const currentDay = `${monthStrLong} ${day} at ${hours}:${minutes}`

  const notificatonRef = firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Notification')

  notificatonRef
    .add({
      Unread: true,
      Message: message,
      Date: currentDay,
      Category: category,
      Redirect: redirect,
      Avatar: avatar,
    })
    .then(docRef => {
      notificatonRef.doc(docRef.id).update({
        Key: docRef.id,
      })
      console.log(`通知已经写入到用户数据库中${docRef.id}`)
    })
}
