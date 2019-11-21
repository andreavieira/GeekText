/**
  ALL VISUAL/RENDERING CODE GOES HERE.
*/

// STEVEN DO NOT TOUCH!!!!!!!!!!!!!!!!!!!!!!

'use strict'

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

  var accntButton = header.querySelector('#profile-btn');
  accntButton.addEventListener('click', function(event) {
    me.router.navigate('/profile');
  });

  var signupButton = header.querySelector('#signup-btn');
  signupButton.addEventListener('click', function(event) {
    me.router.navigate('/createAcc');
  });

  header.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), header);
}



/* HOME SCRIPTS */
Bookstore.prototype.viewHome = function (bDetails) {
  var homePage = document.querySelector('#home-page').cloneNode(true);

  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);


  document.getElementById("home-books").innerHTML = "";
  var bookItems = document.getElementById("home-books");

  // function renderRating(bookRating) {
  //   return bookRating;
  //   // Will turn double rating in DB to star representation
  // }

  var bs = this;

  function renderBookRow(doc) {
    var bookRow = document.createElement('div');
    bookRow.classList.add('cart-row');
    // TODO make routing work for pertaining books!
    var bookRowContents = `
                <div class="cart-item cart-column">
                  <i class="book-details-link" id="${doc.Id}">
                  <img class="item-image" src="${doc.Cover}" width="100" height="200">
                  </i>
                </div>
                <div class="cart-description cart-column">
                  <span id="description">${"<i> " + doc.BookTitle + "</i> By: " + doc.AuthorFn + " " + doc.AuthorLn}</span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">$${doc.Price}</span>
                </span>
                <div class="cart-quantity cart-column">
                  <span>${doc.Rating}</span>
                </div>
              </div>
              </div>
            </div>`
    bookRow.innerHTML = bookRowContents

    var bookItems = document.getElementsByClassName('cart-items')[0];


    var bookDetails = bookRow.querySelector('.book-details-link');
    bookDetails.addEventListener('click', function () {
      bs.router.navigate('/book/' + bookDetails.id);
    });

    bookItems.append(bookRow);
  }

  bDetails.forEach(book =>{
    renderBookRow(book);
  });

  //let bs = this;
  var bookDetails = homePage.querySelector('.book-details-link');
  bookDetails.addEventListener('click', function () {
    bs.router.navigate('/book/' + bookDetails.id);
  });

    document.getElementById("sortByGenre").addEventListener("click", function() {
        bs.router.navigate('/sortByGenre');
    });
    document.getElementById("sortByBestSellers").addEventListener("click", function() {
        bs.router.navigate('/sortByBestSellers');
    });
    document.getElementById("sortByRating").addEventListener("click", function() {
        bs.router.navigate('/sortByRating');
    });
    document.getElementById("sortByBookTitle").addEventListener("click", function() {
        bs.router.navigate('/');
    });
    document.getElementById("sortByAuthor").addEventListener("click", function() {
        bs.router.navigate('/sortByAuthor');
    });
    document.getElementById("sortByPrice").addEventListener("click", function() {
        bs.router.navigate('/sortByPrice');
    });
    // document.getElementById("sortByRelease").addEventListener("click", function() {
    //   bs.router.navigate('/sortByRelease');
    // });
}


// STEVEN ---------------------
Bookstore.prototype.viewCreateAcc = function(doc) {
    var createAccPage = document.querySelector('#createAcc-page').cloneNode(true);
    let me = this;

    // Once the user has clicked on the create account button, it will redirect user
    // back to the homepage with the user already logged in
    createAccPage.querySelector(".create-acc-btn").addEventListener('click',function() {
        me.router.navigate("/")
    });


    createAccPage.removeAttribute('hidden');
    this.replaceElement(document.querySelector('main'), createAccPage);
}


Bookstore.prototype.viewProfile = function(doc) {
    var profilePage = document.querySelector('#profile-page').cloneNode(true);
    let me = this;

    profilePage.removeAttribute('hidden');
    this.replaceElement(document.querySelector('main'), profilePage);

    var fName = profilePage.querySelector(".profile-fName");
    fName.innerHTML = "<strong>First Name: </strong>" + doc.get("fName");

    var lName = profilePage.querySelector(".profile-lName");
    lName.innerHTML = "<strong>Last Name: </strong>" + doc.get("lName");

    var email = profilePage.querySelector(".profile-email");
    email.innerHTML = "<strong>Email: </strong>" + doc.get("email");

    var password = profilePage.querySelector(".profile-password");
    password.innerHTML = "<strong>Password: </strong> CENSORED lol";

    var street = profilePage.querySelector(".profile-street");
    street.innerHTML = "<strong>Home Address: </strong>" + doc.get("streetAddress");

    var city = profilePage.querySelector(".profile-city");
    city.innerHTML = "<strong>City: </strong>" + doc.get("city");

    var state = profilePage.querySelector(".profile-state");
    state.innerHTML = "<strong>State: </strong>" + doc.get("state");

    var zip = profilePage.querySelector(".profile-zip");
    zip.innerHTML = "<strong>Zip Code: </strong>" + doc.get("zipCode");

    var country = profilePage.querySelector(".profile-country");
    country.innerHTML = "<strong>Country: </strong>" + doc.get("country");



}


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
    updateCartTotal();
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


  function addToCart(event){
    var buttonClicked = event.target
    var ID = document.getElementById("save-data-id").textContent;
    var docTitle = document.getElementById("save-book-title").textContent;
    var docAuthor = document.getElementById("save-author-name").textContent;
    console.log(docAuthor)
    var docPrice = document.getElementById("save-price").textContent;
    console.log(docPrice)
    var docImage = document.getElementById("save-image").src;
    console.log(docImage)

    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();

    let cartDocRef = firebase.firestore().collection("users").doc("nrodr047").collection("cart")
    let addDoc = cartDocRef.add({
      title: docTitle,
      authorName: docAuthor,
      price: docPrice,
      image: docImage
    }).then(ID => {
      console.log('Added document with ID: ', ID.id);
    });
  //updateCartTotal();
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
  var saveRow = document.createElement('div');
  saveRow.classList.add('save-row')
  var saveRowContents = `
              <div class="cart-item cart-column">
              <div id ="save-data-id" hidden>${doc.id}</div>
                <img class="item-image" id="save-image" src="${doc.get("image")}" width="100" height="200">
              </div>
              <div class="cart-description cart-column">
                <span>
                <span id="save-book-title"><i>${doc.get("title")}</i></span> By:
                <span id="save-author-name">${doc.get("authorName") + " "}</span>
                </span>
              </div>
              <span class="cart-price cart-column">
                <span id ="save-price">${doc.get("price")}</span>
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
  saveRow.innerHTML = saveRowContents
  var saveItems = document.getElementsByClassName('saved-items')[0];
  saveItems.append(saveRow);

  saveRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  saveRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  saveRow.getElementsByClassName('btn-add')[0].addEventListener('click', addToCart);
}


    if (doc.id != "save"){          //if the document is not a saved item
      renderCart();                 //render cart
    }
    if(doc.id == "save"){
      let docRef = firebase.firestore().collection("users").doc("nrodr047").collection("cart").doc("save").collection("savedItems")
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
  var currentUser = firebase.auth().currentUser;


  bookDetails.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), bookDetails);

  var bookCover = bookDetails.querySelector(".book-cover");
  bookCover.src = "http://localhost:5000/" + doc.get("Cover");

  var bookTitle = bookDetails.querySelector(".book-title");
  bookTitle.innerHTML = "<strong> Title: </strong>" + doc.get("BookTitle");

  var author = bookDetails.querySelector(".author-fn");
  author.innerHTML = "<strong> Author: </strong> " + doc.get("AuthorFn") + " " + doc.get("AuthorLn");

  var bookDesc = bookDetails.querySelector(".book-description");
  bookDesc.innerHTML = "<strong> Description: </strong> " + doc.get("BookDesc");

  var bookGenre = bookDetails.querySelector(".book-genre");
  bookGenre.innerHTML = "<strong> Genre: </strong> " + doc.get("Genre");

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

  //Modal
  var modal = bookDetails.querySelector("#myModal");
  var img = bookDetails.querySelector(".book-cover");
  var modalImg = bookDetails.querySelector("#img01");
  //var captionText = bookDetails.querySelector("#caption");
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = bookCover.src;
  }

  var span = bookDetails.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  }

  // Books being passed are:
  var authorBookRef = this.db.collection("bookdetails").where("AuthorLn", "==", doc.get("AuthorLn"));
  //console.log(doc.get("AuthorLn"));
  //console.log(authorBookRef)
    authorBookRef.get().then(books =>{
      books.forEach(book =>{

        let simBooks = bookDetails.querySelector(".similar-books");
        simBooks.innerHTML = simBooks.innerHTML + " " + book.get("BookTitle");

      })
    });

  // Books by the same author
  var bookItems = document.getElementById("books-by-author");

  // End books by same author

  let bReviews = [];
  let reviewRef = this.db.collection("bookdetails").doc(doc.id).collection("Reviews");
  reviewRef.get().then(snapshot => {
    if(!snapshot.exists){
    }
    snapshot.forEach(review => {
      bReviews.push(review.data());
    });
    this.renderReviews(bReviews, bookDetails);
  });

  let reviewText = bookDetails.querySelector("#review-text");
  let submitBtn = bookDetails.querySelector("#submit-btn");
  let starRating = bookDetails.querySelector('.rate');
  let me = this;
  let exists = true;
  submitBtn.onclick = function() {
    //send review to database
    //update rating
    let list = starRating.querySelectorAll("input");
    //console.log(list);
    for(let i = 0; i < 5; i++){

      if(list[i].checked){
        starRating.rating = 5 - i;
        break;
      }
    }

    if(starRating.rating == -1) {
      alert("Please add a star rating to your review");
    } else if (reviewText.value == "" ) {
      alert("Please add a review");
    } else if (currentUser == null) {
      alert("Please Log in to submit a review")
    } else {
      // let newReview = me.db.collection("bookdetails").doc(doc.id).collection("Reviews").add({
      //   Rating: starRating.rating,
      //   Text: reviewText.value,
      //   Uid: currentUser.uid
      // });
      alert("Review Submitted!");
      console.log({
        rating: starRating.rating,
        reviewText: reviewText.value,
        Uid: currentUser.uid
      });
      reviewText.setAttribute("disabled", true);
      submitBtn.setAttribute("disabled", true);

      //average out the ratings based on reviews.
    }
  };
}

Bookstore.prototype.renderReviews = function (bReviews, details_El) {
  let review_Container = document.createElement("div");
  let reviewID = 0;
  bReviews.forEach(review => {
    let review_El = details_El.querySelector(".filled-review").cloneNode(true);
    review_El.querySelector(".rated").setAttribute("rating", review.Rating);
    let index = 5;
    review_El.querySelectorAll(".rated label").forEach(rating => {
      rating.previousElementSibling.name = "rated-" + reviewID + "" + index;
      rating.setAttribute("for", rating.previousElementSibling.name);
      index--;
    });

    review_El.querySelectorAll("input").forEach(radio => {
        if(radio.getAttribute("value") == review_El.querySelector(".rated").getAttribute("rating")){
          radio.setAttribute("checked", "checked");
        }
      });

    review_El.querySelector(".filled-review-text").innerHTML = review.Text;
    review_El.removeAttribute("hidden");
    review_Container.appendChild(review_El);

    reviewID++;
  });
  details_El.querySelector(".filled-review-container").removeAttribute("hidden");
  details_El.querySelector(".filled-review-container").innerHTML = '';
  details_El.querySelector(".filled-review-container").appendChild(review_Container);
}



//USED FOR RENDERING;
Bookstore.prototype.replaceElement = function (parent, content) {
  parent.innerHTML = '';
  parent.append(content);
}
