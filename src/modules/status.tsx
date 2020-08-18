import firebase from 'firebase'

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
        statCollectionRef.doc('00').set({
          Label: 'January',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('01').set({
          Label: 'February',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('02').set({
          Label: 'March',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('03').set({
          Label: 'April',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('04').set({
          Label: 'May',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('05').set({
          Label: 'June',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('06').set({
          Label: 'July',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('07').set({
          Label: 'August',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('08').set({
          Label: 'September',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('09').set({
          Label: 'October',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('10').set({
          Label: 'November',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
        statCollectionRef.doc('11').set({
          Label: 'December',
          'In Progress': 0,
          Completed: 0,
          Planning: 0,
          Dropped: 0,
        })
      }
    })
}
