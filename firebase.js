// import firebase from 'firebase'
import admin from 'firebase-admin'
import serviceAccount from './adminsdk-private-dev.json'

// const firebaseConfig = {
//     apiKey: 'AIzaSyCwJlX-MBeZQqZmEn6DRgOVPKei5UY5JPg',
//     authDomain: 'node-firebase-52931.firebaseapp.com',
//     projectId: 'node-firebase-52931',
//     storageBucket: 'node-firebase-52931.appspot.com',
//     messagingSenderId: '852449957592',
//     appId: '1:852449957592:web:4e3887d3defcff910aa9ad',
//     measurementId: 'G-N3Z4EPFZHF',
// }

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

// firebase.initializeApp(firebaseConfig)
const db = admin.firestore()
const users = db.collection('users')
export { users, db }
