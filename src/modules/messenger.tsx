import firebase from 'firebase'

export function deleteFriendRequest(
  currUserKey: string,
  requestUserKey: string
) {
  firebase
    .firestore()
    .collection('user')
    .doc(currUserKey)
    .collection('Friend')
    .doc('Notification')
    .collection('Request')
    .doc(requestUserKey)
    .delete()
    .then(() => {
      console.log(`已经从当前用户中删除好友${currUserKey}的申请`)
    })
    .catch(error => {
      console.log(`删除用户好友申请时出现错误 ${error}`)
    })
}

export function deleteFriendApplication(
  requestUserKey: string,
  currUserKey: string
) {
  firebase
    .firestore()
    .collection('user')
    .doc(requestUserKey)
    .collection('Friend')
    .doc('Notification')
    .collection('Application')
    .doc(currUserKey)
    .delete()
    .then(() => {
      console.log(`已经从申请用户${requestUserKey}中删除申请记录`)
    })
    .catch(error => {
      console.log(`删除用户好友申请时出现错误 ${error}`)
    })
}

export function addFriend(
  currUserKey: string,
  addedUserKey: string,
  addedUserData: any
) {
  firebase
    .firestore()
    .collection('user')
    .doc(currUserKey)
    .collection('Friend')
    .doc('Added')
    .collection('Friends')
    .doc(addedUserKey)
    .set(addedUserData)
    .then(() => {
      console.log(`${addedUserKey}现在是${currUserKey}的好友`)
    })
    .catch(error => {
      console.log(`添加好友时出现错误 ${error}`)
    })
}

export function deleteFriend(currUserKey: string, deleteFriendKey: string) {
  firebase
    .firestore()
    .collection('user')
    .doc(currUserKey)
    .collection('Friend')
    .doc('Added')
    .collection('Friends')
    .doc(deleteFriendKey)
    .delete()
    .then(() => {
      console.log(`${deleteFriendKey}不再是${currUserKey}的好友`)
    })
    .catch(error => {
      console.log(`删除好友${deleteFriendKey}时出现错误 ${error}`)
    })
}

export function sendMessage(
  currUserKey: string,
  sendUserKey: string,
  chatDoc: any
) {
  firebase
    .firestore()
    .collection('user')
    .doc(currUserKey)
    .collection('Friend')
    .doc('Added')
    .collection('Friends')
    .doc(sendUserKey)
    .collection('Chat')
    .add(chatDoc)
    .then(chatDocRef => {
      firebase
        .firestore()
        .collection('user')
        .doc(currUserKey)
        .collection('Friend')
        .doc('Added')
        .collection('Friends')
        .doc(sendUserKey)
        .collection('Chat')
        .doc(chatDocRef.id)
        .update({
          ChatKey: chatDocRef.id,
        })
      firebase
        .firestore()
        .collection('user')
        .doc(sendUserKey)
        .collection('Friend')
        .doc('Added')
        .collection('Friends')
        .doc(currUserKey)
        .collection('Chat')
        .doc(chatDocRef.id)
        .set(chatDoc)

      firebase
        .firestore()
        .collection('user')
        .doc(sendUserKey)
        .collection('Friend')
        .doc('Added')
        .collection('Friends')
        .doc(currUserKey)
        .collection('Chat')
        .doc(chatDocRef.id)
        .update({
          ChatKey: chatDocRef.id,
        })
    })
  console.log(`${chatDoc.Message}发送到${currUserKey}和${sendUserKey}集合中`)
}
