function Bookstore() {

  var me = this;
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
  let booksDocRef = firebase.firestore().collection("bookdetails")
  // Initial value of next items to query
  // var next = firebase.firestore().collection("bookdetails");

  this.router
    .on({
      '/': function () { // Navigation string '/' leads to viewHome()
        let bDetails = [];
        let allItems = booksDocRef.orderBy("BookTitle", "asc").get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "BookTitle", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  // Pagination
  this.router
    .on({
      '/page/:page/sort-by/:sort/order/:or': function (params) {
        let bDetails = [];
        let allItems = booksDocRef.orderBy(params.sort, params.or).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, params.page, params.sort, params.or);
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  // Routing to best sellers  
  this.router
    .on({
      '/renderBestSellers': function () { // Home sorted by Bestsellers
        console.log("Sorting by best sellers")
        let bDetails = [];
        let allItems = booksDocRef.where("NumSales", ">", 5).orderBy("NumSales", "desc").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "NumSales", "desc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  // Routing to top rated books  
  this.router
    .on({
      '/renderTopRated': function () { // Home sorted by Rating
        console.log("Rendering top-rated books")
        let bDetails = [];
        let allItems = booksDocRef.where("Rating", ">", 3).orderBy("Rating", "desc").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Rating", "desc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  // Genre routing 
  this.router
    .on({
      '/renderPoetryBooks': function () { // Poetry
        console.log("Rendering poetry books")
        let bDetails = [];
        let allItems = booksDocRef.where("Genre", "==", "Poetry").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Genre", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/renderRomanceBooks': function () { // Romance
        console.log("Rendering romance books")
        let bDetails = [];
        let allItems = booksDocRef.where("Genre", "==", "Romance").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Genre", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/renderMysteryBooks': function () { // Mystery
        console.log("Rendering mystery books")
        let bDetails = [];
        let allItems = booksDocRef.where("Genre", "==", "Mystery").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Genre", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/renderSciFiBooks': function () {
        console.log("Rendering science fiction books")
        let bDetails = [];
        let allItems = booksDocRef.where("Genre", "==", "Science Fiction").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Genre", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/renderPhilosophyBooks': function () { // Philosophy
        console.log("Rendering philosophy books")
        let bDetails = [];
        let allItems = booksDocRef.where("Genre", "==", "Philosophy").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Genre", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/renderMagicalRealismBooks': function () { // Magical Realism
        console.log("Rendering magical realism books")
        let bDetails = [];
        let allItems = booksDocRef.where("Genre", "==", "Magical Realism").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Genre", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();
    
  // Sorting routing
  this.router
    .on({
      '/sortByAuthor': function () { // Home sorted by Author
        console.log("Sorting by author")
        let bDetails = [];
        let allItems = booksDocRef.orderBy("AuthorLn").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "AuthorLn", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/booksBy/:id': function (params) { // Same Author
        let bDetails = [];
        var authorNameRef = this.db.collection("bookdetails").where("AuthorLn", "==", params.id);
        authorNameRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewSameAuthor(bDetails);
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/sortByPrice': function () { // Home sorted by Price
        console.log("Sorting by price")
        let bDetails = [];
        let allItems = booksDocRef.orderBy("Price").limit(10).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Price", "asc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      '/sortByRelease': function () { // Home sorted by Release
        console.log("Sorting by publish date")
        let bDetails = [];
        let allItems = booksDocRef.orderBy("PublishDate", "desc").get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              bDetails.push(doc.data());
            });
            that.viewHome(bDetails, 1, "Publisher", "desc");
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    }).resolve();

  this.router
    .on({
      "/createAcc": function (params) {

        that.viewCreateAcc();
      }
    }).resolve();

  this.router
    .on({
      "/profile": function (params) {

        let auth = firebase.auth();
        var userUid = auth.currentUser.uid;

        let allUsers = firebase.firestore().collection("users")
        let userDetails = allUsers.doc(userUid)

        let getUDetails = userDetails.get()
          .then(doc => {
            if (doc.exists) {
              that.viewProfile(doc);
            } else {
              console.log('No user found');
            }
          })
      }
    }).resolve();

  this.router
    .on({
      "/book/:id": function (params) {
        let allBooks = that.db.collection("bookdetails");
        let detailsRef = allBooks.doc(params.id);

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
        //get current logged-in user
        var user = firebase.auth().currentUser;
        let db = firebase.firestore();

        if (user) {
          // If user is signed in:
          //let userInfoRef = firebase.firestore().collection("users")
          var userUid = user.uid                //currentuser ID
          var getUser = db.collection('users').doc(userUid)
          let userRef = getUser.get()
            .then(doc => {
              if (!doc.exists) {
                console.log('No such document!');
              } else {
                console.log('Document data:', doc.data());
                //send user information to viewCart
                that.viewCart(doc);
              }
            })
            .catch(err => {
              console.log('Error getting document', err);
            });

        } else {
          // No user is signed in.
          console.log('No user is signed in.');
        }
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
}

window.onload = function () {
  window.app = new Bookstore();
}
