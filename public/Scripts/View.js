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

  var accntButton = header.querySelector('#profile-btn');
  accntButton.addEventListener('click', function(event) {
    me.router.navigate('/profile');
  });


  header.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), header);
}



/* HOME SCRIPTS */
Bookstore.prototype.viewHome = function (bDetails) {
  var homePage = document.querySelector('#home-page').cloneNode(true);
  //console.log(bDetails[0]);

  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);


  function renderRating(bookRating) {
    return bookRating
    // Will turn double rating in DB to star representation
  }

  var bs = this;

  function renderBookRow(doc) {
    var bookRow = document.createElement('div');
    bookRow.classList.add('cart-row')
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
                  <span>${renderRating(doc.Rating)}</span>
                </div>
              </div>
              </div>
            </div>`
    bookRow.innerHTML = bookRowContents

    var bookDetails = bookRow.querySelector('.book-details-link');
    bookDetails.addEventListener('click', function () {
      //console.log("message")
      bs.router.navigate('/book/' + bookDetails.id);
    });

    var bookItems = document.getElementsByClassName('cart-items')[0];
    bookItems.append(bookRow);
  }

  bDetails.forEach(book => {
    renderBookRow(book);
  });
}

// STEVEN ---------------------
Bookstore.prototype.viewProfile = function(doc) {
    var profilePage = document.querySelector('#profile-page').cloneNode(true);


    // if (document.readyState == 'loading') {
    //     document.addEventListener('DOMContentLoaded', ready)
    // } else {
    //     ready()
    // }


    profilePage.removeAttribute('hidden');
    this.replaceElement(document.querySelector('main'), profilePage);
}



/* SHOPPING CART SCRIPTS */
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
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();

    updateCartTotal()
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
                  <img class="item-image" src="${doc.get("image")}" width="100" height="200">
                </div>
                <div class="cart-description cart-column">
                  <span id="description">${"<i> " + doc.get("title") + "</i> By: " + doc.get("authorName") + " "}</span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">${doc.get("price")}</span>
                </span>
                <div class="cart-quantity cart-column">
                  <input class="cart-quantity-input"
                  type="number" value="1">
                  <ul style="list-style-type:none;">
                  <li>
                  <button class="btn btn-danger cart-quantity-button"
                  type="button">REMOVE</button>
                  <button class="btn btn-save cart-quantity-button"
                  type="button">SAVE FOR LATER</button>
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


  renderCart();

  // Function calculates cart total based on quantity and price
  function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
  }
}

/** BOOK DETAILS SCRIPTS **/
Bookstore.prototype.viewBookDetails = function (doc) {
  var bookDetails = document.querySelector('#book-details').cloneNode(true);

  var bookCover = bookDetails.querySelector(".book-cover");
  bookCover.src = "http://localhost:5000/" + doc.get("Cover");

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
  // //Modal
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
    console.log(list);
    for(let i = 0; i < 5; i++){

      if(list[i].checked){
        starRating.rating = 5 - i;
        break;
      }
    }

    if(starRating.rating == -1) {
      alert("Please add a star rating to your review");
    } else {
      let newReview = me.db.collection("bookdetails").doc(doc.id).collection("Reviews").add({
        Rating: starRating.rating,
        Text: reviewText.value
      });
      console.log("review added");
      console.log({
        rating: starRating.rating,
        reviewText: reviewText.value
      });

      reviewText.setAttribute("disabled", true);
      submitBtn.setAttribute("disabled", true);
    }
  };



  bookDetails.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), bookDetails);
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
