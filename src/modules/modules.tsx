import firebase from 'firebase'

export function addNotification(
  userRef: string,
  message: string,
  date: string,
  category: string,
  redirect: string
) {
  const notificatonRef = firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Notification')

  notificatonRef
    .add({
      Unread: true,
      Message: message,
      Date: date,
      Category: category,
      Redirect: redirect,
    })
    .then(docRef => {
      notificatonRef.doc(docRef.id).update({
        Key: docRef.id,
      })
      console.log(`通知已经写入到用户数据库中${docRef.id}`)
    })
}
