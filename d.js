const fs = require('fs');
const firebase = require('firebase');
const mockData = require('./src/tests/mockData/inventory.json');

var firebaseConfig = {
  apiKey: 'AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8',
  authDomain: 'dv-inventory.firebaseapp.com',
  databaseURL: 'https://dv-inventory.firebaseio.com',
  projectId: 'dv-inventory',
  storageBucket: 'dv-inventory.appspot.com',
  messagingSenderId: '130062240176',
  appId: '1:130062240176:web:ecbca5d29b37d25c6cee75',
};

var app = firebase.initializeApp(firebaseConfig);
let id = 'main-head';
let filestore = app.firestore();
filestore
  .collection('inventory')
  .doc()
  .set({
    name: 'Test2',
    count: 1,
    place: filestore.collection('places').doc(id), // main-101 – id места
  });

// //remove all inventory
// firebase
//   .firestore()
//   .collection('inventory')
//   .get()
//   .then((response) => {
//     let docs = response.docs.map((x) => ({
//       id: x.id,
//       data: x.data(),
//       placeId: x.data().place && x.data().place.id,
//     }));
//     for (let item of docs) {
//       firebase
//         .firestore()
//         .collection('inventory')
//         .doc(item.id)
//         .delete()
//         .then(() => {
//           console.info('Done');
//         });
//     }
//   });

// firebase
//   .firestore()
//   .collection('places')
//   .get()
//   .then((response) => {
//     let docs = response.docs.map((x) => ({
//       id: x.id,
//       data: x.data(),
//       parts: x.data().parts && x.data().parts.map((part) => part.id),
//     }));

//     fs.writeFileSync('places.json', JSON.stringify(docs));
//   });

// firebase
//   .firestore()
//   .collection('inventory')
//   .get()
//   .then((response) => {
//     let docs = response.docs.map((x) => ({
//       id: x.id,
//       data: x.data(),
//       placeId: x.data().place && x.data().place.id,
//     }));
//     //console.log(docs);
//     fs.writeFileSync('inventory.json', JSON.stringify(docs));
//   });

// ---------------------- add/set -----------
// firebase.firestore();
// filestore
//   .collection('inventory')
//   .doc()
//   .set({
//     name: 'Test',
//     count: 1,
//     place: filestore.collection('places').doc('main-101'), // main-101 – id места
//   })
//   .then(() => {
//     console.info('Done');
//   });

////////////////////// -------- delete --------
// firebase
//   .firestore()
//   .collection('inventory')
//   .doc('id')
//   .delete()
//   .then(() => {
//     console.info('Done');
//   });

// ------------------  update ----------------
// firebase
//   .firestore()
//   .collection('inventory')
//   .doc('id')
//   .set({
//     count: 2,
//   })
//   .then(() => {
//     console.info('Done');
//   });
