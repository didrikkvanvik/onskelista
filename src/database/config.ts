import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyDpHycKQ_Scc9ra240ASFp95TCn69yC5sI',
    authDomain: 'onskelista-609b5.firebaseapp.com',
    databaseURL: 'https://onskelista-609b5-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'onskelista-609b5',
    storageBucket: 'onskelista-609b5.appspot.com',
    messagingSenderId: '44342670724',
    appId: '1:44342670724:ios:188556922ff5b10485d9d1',
    measurementId: 'G-2F66CRKE93',
}
const db = firebase.initializeApp(firebaseConfig)

export default db
