import firebase from 'firebase'

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function initStatusActivity(userRef: string) {
  const statCollectionRef = firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Statistics')
  statCollectionRef
    .doc('00')
    .get()
    .then(doc => {
      if (!doc.exists) {
        monthList.forEach((month, index) => {
          let docRef = index < 10 ? `0${index}` : index.toString()
          statCollectionRef.doc(docRef).set({
            Label: month,
            'In Progress': 0,
            Completed: 0,
            Planning: 0,
            Dropped: 0,
          })
        })
      }
    })
}

export function initFriendCollection(
  userRef: string,
  userName: string | null | undefined,
  userEmail: string | null | undefined
) {
  firebase
    .firestore()
    .collection('friends')
    .doc(userRef)
    .get()
    .then(doc => {
      // 如果不存在该用户的文档 写入到集合中
      if (!doc.exists) {
        firebase
          .firestore()
          .collection('friends')
          .doc(userRef)
          .set({
            avatar: '/images/user.jpg',
            profile: {
              profileName: userName,
              profileBio: '',
              profileEmail: userEmail,
              profileGithub: '',
              profileLocation: '',
              profileWeb: '',
              profilelinkedin: '',
            },
            Key: userRef,
          })
      }
    })
}

export function initUserProfile(userRef: string) {
  const profileRef = firebase
    .firestore()
    .collection('user')
    .doc(userRef)
    .collection('Setting')
    .doc('Profile')
  profileRef.get().then((doc: any) => {
    if (!doc.exists) {
      profileRef.set({
        avatar: '/images/user.jpg',
        profile: {
          profileName: '',
          profileBio: '',
          profileEmail: '',
          profileGithub: '',
          profileLocation: '',
          profileWeb: '',
          profilelinkedin: '',
        },
      })
    }
  })
}
