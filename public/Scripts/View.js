/**
  ALL VISUAL/RENDERING CODE GOES HERE.
*/

// STEVEN DO NOT TOUCH!!!!!!!!!!!!!!!!!!!!!!

'use strict'

Bookstore.prototype.initTemplates = function () {
  this.templates = {};

  var that = this;
  document.querySelectorAll('.template').forEach(function (el) {
    that.templates[el.getAttribute('id')] = el;
  });

};

/* HEADER SCRIPTS */
Bookstore.prototype.viewHeader = function () {
  //grab clone of template header
  var header = document.querySelector('#main-header').cloneNode(true);
  var me = this;


  var cartButton = header.querySelector('#cart-btn');
  cartButton.addEventListener('click', function (event) {
    me.router.navigate('/cart');
  });
  var homeButton = header.querySelector('#home-btn');
  homeButton.addEventListener('click', function (event) {
    me.router.navigate('/');
  });

//   var accntButton = header.querySelector('#profile-btn');
//   accntButton.addEventListener('click', function(event) {
//     me.router.navigate('/profile');
//   });


  header.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), header);
}



/* HOME SCRIPTS */
Bookstore.prototype.viewHome = function (doc) {
  var homePage = document.querySelector('#home-page').cloneNode(true);


  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);

  function renderRating(bookRating) {
    return bookRating
    // Will turn double rating in DB to star representation
  }
  
  function renderCart() {
    var bookRow = document.createElement('div');
    bookRow.classList.add('cart-row')
    // TODO make routing work for pertaining books!
    var bookRowContents = `
                <div class="cart-item cart-column">
                  <i class="book-details-link" id="ZyeZCXscDEzIKRG7gqUJ">
                  <img class="item-image" src="${doc.get("Cover")}" width="100" height="200">
                  </i>
                </div>
                <div class="cart-description cart-column">
                  <span id="description">${"<i> " + doc.get("BookTitle") + "</i> By: " + doc.get("AuthorFn") + " " + doc.get("AuthorLn")}</span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">$${doc.get("Price")}</span>
                </span>
                <div class="cart-quantity cart-column">
                  <span>${renderRating(doc.get("Rating"))}</span>
                </div>
              </div>
              </div>
            </div>`
    bookRow.innerHTML = bookRowContents
    var bookItems = document.getElementsByClassName('cart-items')[0];
    bookItems.append(bookRow);
  }
  renderCart();

  let bs = this;
  var bookDetails = homePage.querySelector('.book-details-link');
  bookDetails.addEventListener('click', function () {
    bs.router.navigate('/book/' + bookDetails.id);
  });
}

// STEVEN ---------------------
// Bookstore.prototype.viewProfile = function(doc) {
//     var profilePage = document.querySelector('#profile-page').cloneNode(true);
  
//     profilePage.removeAttribute('hidden');
//     this.replaceElement(document.querySelector('main'), profilePage);
//     if (document.readyState == 'loading') {
//         document.addEventListener('DOMContentLoaded', ready)
//     } else {
//         ready()
//     }
//   }


/* SHOPPING CART SCRIPTS */

//TO DO
//Options if no items in cart or saved
//Add to cart button
//Save for later button event listener
//access documents for saved list
//fix references for book details

Bookstore.prototype.viewCart = function (doc) {
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);

  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }

  //Eventlistener constructors
  function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')   //for btn-danger class
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {                      //loops through all buttons in cart
      var button = removeCartItemButtons[i]                                   //listener for 'click' event
      button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }
  }

  // Function calls the updateCartTotal function when remove button is clicked.
  // @param {*} event even when remove button is clicked
  function removeCartItem(event) {
    var buttonClicked = event.target
    var ID = document.getElementById("data-id").textContent
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();

    let cartDocRef = firebase.firestore().collection("users").doc("nrodr047").collection("cart")
    let allItems = cartDocRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          var deleteDoc =  cartDocRef.doc(ID).delete();
            });
          })
    //updateCartTotal();
  }

  // Checks if inputted value is an int greater than 1 and calls updateCartTotal.
  // @param {*} event used when quantity value is changed 
  function quantityChanged(event) {
    var input = event.target                        
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1                             
    }
    updateCartTotal()                               
  }

  function renderCart() {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    var cartRowContents = `
                <div class="cart-item cart-column">
                <div id ="data-id" hidden>${doc.id}</div>
                  <img class="item-image" src="${doc.get("image")}" width="100" height="200">
                </div>
                <div class="cart-description cart-column">
                  <span id="description">${"<i> " + doc.get("title") + "</i> By: " + doc.get("authorName") + " "}</span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">${doc.get("price")}</span>
                </span>
                <div class="cart-quantity cart-column">
                  <input class="cart-quantity-input" id="quant"
                  type="number" value="1"></input>
                  <ul style="list-style-type:none;">
                  <li>
                  <button class="btn btn-save cart-quantity-button"
                  type="button">SAVE FOR LATER</button>
                  <button class="btn btn-danger cart-quantity-button"
                  type="button">REMOVE</button>
                  </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>`
    cartRow.innerHTML = cartRowContents
    var cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}



function renderSave(doc) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('save-row')
  var cartRowContents = `
              <div class="cart-item cart-column">
              <br>
              <span id="default" hidden><i>You currently do not have items saved for later.</i></span>
              </br>
              <div id ="data-id" hidden>${doc.id}</div>
                <img class="item-image" src="${doc.get("image")}" width="100" height="200">
              </div>
              <div class="cart-description cart-column">
                <span id="description">${"<i> " + doc.get("title") + "</i> By: " + doc.get("authorName") + " "}</span>
              </div>
              <span class="cart-price cart-column">
                <span id ="item-price">${doc.get("price")}</span>
              </span>
              <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" id="quant"
                type="number" value="1"></input>
                <ul style="list-style-type:none;">
                <li>
                <button class="btn btn-add cart-quantity-button"
                type="button">ADD TO CART</button>
                <button class="btn btn-danger cart-quantity-button"
                type="button">REMOVE</button>
                </li>
                </ul>
              </div>
            </div>
            </div>
          </div>`
  cartRow.innerHTML = cartRowContents
  var cartItems = document.getElementsByClassName('saved-items')[0];
  cartItems.append(cartRow);

  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}


  // if (saveListRef != null){            //if the path has documents
    if (doc.id != "save"){          //if the document is not a saved item
      renderCart();                 //render cart
    }
    if(doc.id == "save"){
      let docRef = firebase.firestore().collection("users").doc("nrodr047").collection("save")
      let allItems = docRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            renderSave(doc);
              });
            })
      renderSave();
    }

  // Function calculates cart total based on quantity and price
  function updateCartTotal(event) {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = document.getElementById('item-price').innerHTML;
      var price = parseFloat(priceElement.replace('$',''));
      console.log(price)
      var quantityElement = document.getElementById('quant').value;
      console.log(quantityElement);
      var quantity = quantityElement;
      total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
  }
}

/** BOOK DETAILS SCRIPTS **/
Bookstore.prototype.viewBookDetails = function (doc) {
  var bookDetails = document.querySelector('#book-details').cloneNode(true);

  var bookTitle = bookDetails.querySelector(".book-title");
  bookTitle.innerHTML = "<strong> Title: </strong>" + doc.get("BookTitle");

  var author = bookDetails.querySelector(".author-fn");
  author.innerHTML = "<strong> Author: </strong> " + doc.get("AuthorFn") + " " + doc.get("AuthorLn");

  var bookDesc = bookDetails.querySelector(".book-description");
  bookDesc.innerHTML = "<strong> Description: </strong> " + doc.get("BookDesc");

  var authorBio = bookDetails.querySelector(".author-bio");
  authorBio.innerHTML = "<strong> Biography: </strong> " + doc.get("AuthorBio");

  var publishDate = bookDetails.querySelector(".publish-date");
  publishDate.innerHTML = "<strong> Publish Date: </strong> " + doc.get("PublishDate");

  var publisher = bookDetails.querySelector(".publish-date");
  publisher.innerHTML = "<strong> Publisher: </strong> " + doc.get("Publisher");

  var price = bookDetails.querySelector(".price");
  price.innerHTML = "<strong> Price: </strong> " + doc.get("Price");

  var rating = bookDetails.querySelector(".rating");
  rating.innerHTML = "<strong> Rating: </strong> " + doc.get("Rating");

  var numSales = bookDetails.querySelector(".num-sales");
  numSales.innerHTML = "<strong> Number of Sales: </strong> " + doc.get("NumSales");

  bookDetails.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), bookDetails);
}


//TODO CLEANUP
Bookstore.prototype.renderTemplate = function (id, data) {
  var template = this.templates[id];
  var el = template.cloneNode(true);
  el.removeAttribute('hidden');
  this.render(el, data);
  return el;
}

Bookstore.prototype.render = function (el, data) {
  if (!data) {
    return;
  }

}

Bookstore.prototype.getDeepItem = function (obj, path) {
  path.split('/').forEach(function (chunck) {
    obj = obj[chunk];
  });
  return obj;
};


//USED FOR RENDERING;
Bookstore.prototype.replaceElement = function (parent, content) {
  parent.innerHTML = '';
  parent.append(content);
}
