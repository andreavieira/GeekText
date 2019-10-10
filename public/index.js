const db = firebase.firestore();
let bookDetails = db.collection('bookdetails').doc('ZfM58lOJR2WZNA0SMGDX');
let doc = bookDetails.get().then( doc => {
    if(!doc.exists) {
      console.log('No document');
    } else {
      console.log("Document Data: ", doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting Document', err);
  })
