/**
  ALL VISUAL/RENDERING CODE GOES HERE.
*/
'use strict'

Bookstore.prototype.initTemplates = function() {
  this.templates = {};
  var that = this;
  document.querySelectorAll('.template').forEach(function(el) {
    that.templates[el.getAttribute('id')] = el;
  });

};

/** DEFINE DB REFERENCE */
var db = firebase.firestore();

/** HEADER SCRIPTS */
Bookstore.prototype.viewHeader = function() {
  //Grab clone of template header
  var header = document.querySelector('#main-header').cloneNode(true);
  var me = this;

  var cartButton = header.querySelector('#cart-btn');
  cartButton.addEventListener('click', function(event) {
    me.router.navigate('/cart');
  });
  var homeButton = header.querySelector('#home-btn');
  homeButton.addEventListener('click', function(event) {
    me.router.navigate('/');
  });
  var profileButton = header.querySelector('#account-btn');
  profileButton.addEventListener('click', function(event) {
    me.router.navigate('/profile');
  });
  header.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), header);
}

/** HOME SCRIPTS */ 
Bookstore.prototype.viewHome = function() {
<<<<<<< HEAD
  var homePage = document.querySelector('#home-page').cloneNode(true);

  /** FUNCTIONALITIES OF FEATURE */
  var db = firebase.firestore();
  const books = db.collection("bookdetails");
  const outputDescript = document.querySelector("#description")
  const outputImage = document.querySelector("#item-image")
  const outputPrice = document.querySelector("#item-price")
  const outputRating = document.querySelector("rate")

  // Function for books, by newly added
  function renderBook(doc){
    let bkCover = doc.get("Cover");
    let bkTitle = doc.get("BookTitle");
    let bkAuthorLn = doc.get("AuthorLn");
    let bkAuthorFn = doc.get("AuthorFn");
    let bkPrice = doc.get("Price");
    let bkRating = doc.get("Rating"); // Create functionality to turn number rating to star representation
    //outputImage = someMethod(); has to find path in your images
    outputDescript.innerHTML = bkTitle + " by: " + bkAuthorLn + ", " + bkAuthorFn;
    outputPrice.innerHTML = "$" + bkPrice;
    //outputRating = someMethod();
  }
=======
var homePage = document.querySelector('#home-page').cloneNode(true);
let bs = this;
var bookDetails = homePage.querySelector('.book-details-link');
bookDetails.addEventListener('click', function() {
  bs.router.navigate('/book/' + bookDetails.id);
});
//ALL VISUAL HOME CODE GOES HERE:
>>>>>>> 30c6bd4ef0bb26c7fa2bbba32e71709258cb0034

  // renderRowsOfBooks = function(){
  //   let allBooks = books.get()
  //     .then(snapshot => {
  //       snapshot.forEach(doc =>{
  //           console.log(doc.id, '=>', doc.data());
  //           renderBook(doc);
  //       });
  //     })
  //     .catch(err =>{
  //       console.log('Error getting documents', err);
  //     });
  // }

  // renderRowsOfBooks();

  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);
}

/** SHOPPING SCRIPTS */
Bookstore.prototype.viewCart = function() {
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);
  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);
<<<<<<< HEAD

  /** FUNCTIONALITIES OF FEATURE */
  // Initializing database 
  const db = firebase.firestore();
  const cartDocRef = db.collection("users").doc("nrodr047").collection("cart")
  const outputDescript = document.querySelector("#description")
  const outputImage = document.querySelector("#item-image")
  const outputPrice = document.querySelector("#item-price")
  const cartList = document.querySelector("#cart-items")

  function renderCart(doc){
      let bkTitle = doc.get("title");
      let bkAuthor = doc.get("authorName");
      //const bkImage = doc.get("Cover");
      let bkPrice = doc.get("price");
      outputDescript.innerHTML = bkTitle + " By: " + bkAuthor;
      //outputImage = bkImage;
      outputPrice.innerHTML = "$" + bkPrice;
  }

  getRealtimeUpdates = function(){
    let allItems = cartDocRef.get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                console.log(doc.id, '=>', doc.data());
                renderCart(doc);
            });
        })
        .catch(err =>{
            console.log('Error getting documents', err);
        });
  }

  getRealtimeUpdates();

  // Waiting for doc to load
  if (document.readyState == 'loading'){
      document.addEventListener('DOMContentLoaded', ready)
  } else {
      ready()
  }

  // Event Listeners
  function ready(){
      var removeCartItemButtons = document.getElementsByClassName('btn-danger')   //for btn-danger class
      console.log(removeCartItemButtons)  
      for (var i = 0; i <removeCartItemButtons.length; i++){                      //loops through all buttons in cart
          var button = removeCartItemButtons[i]                                   //listener for 'click' event
          button.addEventListener('click', removeCartItem)
              
      }

      var quanityInputs = document.getElementsByClassName('cart-quantity-input')
      for (var i = 0; i < quanityInputs.length; i++){
          var input = quanityInputs[i]
          input.addEventListener('change', quanityChanged)
      }
  }

  // Function calls the updateCartTotal function when remove button is clicked.
  // @param {*} event even when remove button is clicked
  function removeCartItem(event){
      var buttonClicked = event.target
      let id = buttonClicked.parentElement.parentElement.getAttribute('data-id');
      db.collection('users').doc('nrodr047').collection('cart').doc(id).delete();
      updateCartTotal()
  }
=======

  const cartDocRef = this.db.collection("users").doc("nrodr047").collection("cart")
  const outputDescript = document.querySelector("#description")
  const outputImage = document.querySelector("#item-image")
  const outputPrice = document.querySelector("#item-price")
  const dlist = document.querySelector("#cart-row")
  const cartList = document.querySelector("#cart-list")

  function renderCart(doc){
      let li = document.createElement('li');                  //creates a line for the nodes
      let description = document.createElement('div');       //creates a span for title/author
      let price = document.createElement('div');             //creates a span for price
      //let image = document.createElement('div');

      li.setAttribute('data-id', doc.id);                     //sets the data-id to the doc.id for parent node

      
      title = doc.get("title");                               //gets the title field from database
      author = doc.get("authorName");                         //gets authorname from database
      //image = doc.get("image");
      
      let bkPrice= doc.get("price");                          //tmp var for price from database
      price.textContent = "$" + bkPrice;                      //sets price with '$'
      description.textContent = " " + title + " By: " + author + " ";     //sets description to title and author


      li.appendChild(description);                                //appends decription to node
      li.appendChild(price);


      outputDescript.innerHTML = ((cartList.appendChild(li).firstChild).textContent);
      outputPrice.innerHTML = ((cartList.appendChild(li).lastChild).textContent);

      //probably need a for loop to creat another row in my code
  }

  getRealtimeUpdates = function(){
      let i = 0;
      let allItems = cartDocRef.get()
          .then(snapshot => {
              snapshot.forEach(doc =>{
                  console.log(doc.id, '=>', doc.data());
                  renderCart(doc);
              });
          })
          .catch(err =>{
              console.log('Error getting documents', err);
          });
  }

  getRealtimeUpdates();

  //waits for document to load
  if (document.readyState == 'loading'){
      document.addEventListener('DOMContentLoaded', ready)
  } else {
      ready()
  }

  /**
   *  Eventlistener constructors
   */
  function ready(){
      var removeCartItemButtons = document.getElementsByClassName('btn-danger')   //for btn-danger class
      console.log(removeCartItemButtons)  
      for (var i = 0; i <removeCartItemButtons.length; i++){                      //loops through all buttons in cart
          var button = removeCartItemButtons[i]                                   //listener for 'click' event
          button.addEventListener('click', removeCartItem)
              
      }

      var quanityInputs = document.getElementsByClassName('cart-quantity-input')
      for (var i = 0; i < quanityInputs.length; i++){
          var input = quanityInputs[i]
          input.addEventListener('change', quanityChanged)
      }
  }

  /**
   * Function calls the updateCartTotal function when remove button is clicked.
   * @param {*} event even when remove button is clicked
   */
  function removeCartItem(event){
      var buttonClicked = event.target
      let id = buttonClicked.parentElement.parentElement.get(doc.id);
      db.collection('users').doc('nrodr047').collection('cart').doc(id).delete();
      updateCartTotal();
  }

  /**
   * Checks if inputted value is an int greater than 1 and calls updateCartTotal.
   * @param {*} event used when quantity value is changed 
   */
  function quanityChanged(event){
      var input = event.target                        //changed event
      if (isNaN(input.value) || input.value <=0){     //if input is not an int or <0
          input.value = 1                             //change value to 1
      }
      updateCartTotal()                               //update cart total
  }

  /**
   * Function calculates cart total based on quantity and price
   */
  function updateCartTotal() {
      var cartItemContainer = document.getElementsByClassName('cart-items')[0] //container that contains class cart-items
      var cartRows = cartItemContainer.getElementsByClassName('cart-row')     //all elements within the cart-row
      var total = 0                                                           //price total
      for (var i = 0; i < cartRows.length; i++){                               //loops through all items
          var cartRow = cartRows[i]                                           //gets item in current cart row
          var priceElement = cartRow.getElementsByClassName('cart-price')[0]  //all elements within the cart-price class
          var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //all elements within quantity input class
          var price = parseFloat(priceElement.innerText.replace('$',''))      //gets the string from the input text, removes $, and changes to float
          var quantity = quantityElement.value
          total = total + (price * quantity)
      }
      total = Math.round(total * 100) / 100                                   //rounds total price
      document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //calculate total price, adds $ to string
  }


}

/**
Book Details: Fetches attributes of a given book by ID
 */
Bookstore.prototype.viewBookDetails = function(doc) {
  var bookDetails = document.querySelector('#book-details').cloneNode(true);

  var bookTitle = bookDetails.querySelector(".book-title");
  bookTitle.innerHTML = "<strong> Title: </strong>" + doc.get("BookTitle");

  var author = bookDetails.querySelector(".author-fn");
  author.innerHTML = "<strong> Author: </strong> " + doc.get("AuthorFn") + " " +doc.get("AuthorLn") ;

  var bookDesc = bookDetails.querySelector(".book-description");
  bookDesc.innerHTML = "<strong> Description: </strong> " + doc.get("BookDesc")  ;

  var authorBio = bookDetails.querySelector(".author-bio");
  authorBio.innerHTML = "<strong> Biography: </strong> " + doc.get("AuthorBio")  ;

  var publishDate = bookDetails.querySelector(".publish-date");
  publishDate.innerHTML = "<strong> Publish Date: </strong> " + doc.get("PublishDate")  ;

  var publisher = bookDetails.querySelector(".publish-date");
  publisher.innerHTML = "<strong> Publisher: </strong> " + doc.get("Publisher")  ;

  var price = bookDetails.querySelector(".price");
  price.innerHTML = "<strong> Price: </strong> " + doc.get("Price")  ;

  var rating = bookDetails.querySelector(".rating");
  rating.innerHTML = "<strong> Rating: </strong> " + doc.get("Rating")  ;

  var numSales = bookDetails.querySelector(".num-sales");
  numSales.innerHTML = "<strong> Number of Sales: </strong> " + doc.get("NumSales")  ;

  bookDetails.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), bookDetails);
}
>>>>>>> 30c6bd4ef0bb26c7fa2bbba32e71709258cb0034

  // Checks if inputted value is an int greater than 1 and calls updateCartTotal.
  // @param {*} event used when quantity value is changed 
  function quanityChanged(event){
      var input = event.target                        //changed event
      if (isNaN(input.value) || input.value <=0){     //if input is not an int or <0
          input.value = 1                             //change value to 1
      }
      updateCartTotal()                               //update cart total
  }

  // Function calculates cart total 
  function updateCartTotal() {
      var cartItemContainer = document.getElementsByClassName('cart-items')[0] //container that contains class cart-items
      var cartRows = cartItemContainer.getElementsByClassName('cart-row')     //all elements within the cart-row
      var total = 0                                                           //price total
      for (var i = 0; i < cartRows.length; i++){                               //loops through all items
          var cartRow = cartRows[i]                                           //gets item in current cart row
          var priceElement = cartRow.getElementsByClassName('cart-price')[0]  //all elements within the cart-price class
          var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //all elements within quantity input class
          var price = parseFloat(priceElement.innerText.replace('$',''))      //gets the string from the input text, removes $, and changes to float
          var quantity = quantityElement.value
          total = total + (price * quantity)
      }
      total = Math.round(total * 100) / 100                                   //rounds total price
      document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //calculate total price, adds $ to string
  }
}

/** PROFILE SCRIPTS */
Bookstore.prototype.viewProfile = function() {
  var profilePage = document.querySelector('#profile').cloneNode(true);
  profilePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), profilePage);
}

//TODO CLEANUP
Bookstore.prototype.renderTemplate = function(id, data) {
  var template = this.templates[id];
  var el = template.cloneNode(true);
  el.removeAttribute('hidden');
  this.render(el, data);
  return el;
}

Bookstore.prototype.render = function(el, data) {
  if(!data){
    return;
  }
}

Bookstore.prototype.getDeepItem = function(obj,path) {
  path.split('/').forEach(function(chunck) {
    obj = obj[chunk];
  });
  return obj;
};

//USED FOR RENDERING;
Bookstore.prototype.replaceElement = function(parent, content){
  parent.innerHTML = '';
  parent.append(content);
}
