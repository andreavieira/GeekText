
function Bookstore() {

  var me = this;
  me.initTemplates();
  me.viewHeader();
  me.initRouter();
  me.db = firebase.firestore();
  //SECURITY CODE GOES here
}

//NAVIGATION CODE
/**
  initializes the router and dictates what navigation string
  leads to what render function.
  Current render functions:
  viewHeader()
  viewCart()
  viewHome()

  HOW TO USE:
  when you need to navigate to another page, call
  this.router.navigate('NAVIGATION_STRING');

*/
Bookstore.prototype.initRouter = function () {
  this.router = new Navigo();
  var that = this;
  this.router
    .on({
      '/': function () { // navigation string '/' leads to viewHome()
        let booksDocRef = firebase.firestore().collection("bookdetails")
        let allItems = booksDocRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              that.viewHome(doc);
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      "/book/:id": function (params) {
        let detailsRef = that.db.collection("bookdetails").doc(params.id);
        let getDoc = detailsRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              that.viewBookDetails(doc);
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/cart': function () {
        let cartDocRef = that.db.collection("users").doc("nrodr047").collection("cart")
        let allItems = cartDocRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              that.viewCart(doc);
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();


  //FIRESTORE LOAD COLLECTIONS
  return this.router;
}

Bookstore.prototype.getCleanPath = function (dirtyPath) {
  if (dirtyPath.startsWith('/index.html')) {
    return dirtyPath.split('/').slice(1).join('/');
  } else {
    return dirtyPath;
  }
};

window.onload = function () {
  window.app = new Bookstore();
}
