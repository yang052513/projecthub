import firebase from 'firebase'

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
