import firebase from 'firebase'

export function addProject(userRef: string, docData: any, isPublic: boolean) {
  firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Project')
    .add(docData)
    .then(docRef => {
      //Update the project Uid Key to document
      firebase
        .firestore()
        .collection('user')
        .doc(userRef)
        .collection('Project')
        .doc(docRef.id)
        .update({
          Key: docRef.id,
        })

      if (isPublic) {
        firebase.firestore().collection('project').doc(docRef.id).set(docData)
        firebase
          .firestore()
          .collection('project')
          .doc(docRef.id)
          .update({ Key: docRef.id })
      }
    })
}

export function deleteProject(userRef: string, projectRef: string) {
  firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Project')
    .doc(projectRef)
    .delete()
    .then(() => {
      console.log(`(๑•̀ㅂ•́)و✧ 已经从用户${userRef}删除这个项目${projectRef}`)
    })
    .catch(error => {
      console.log(`删除项目时出错`)
    })
}
