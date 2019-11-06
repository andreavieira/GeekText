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

//Render functions


Bookstore.prototype.viewHeader = function() {
  //grab clone of template header
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


  header.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), header);
}


Bookstore.prototype.viewHome = function() {
var homePage = document.querySelector('#home-page').cloneNode(true);
let bs = this;
var bookDetails = homePage.querySelector('.book-details-link');
bookDetails.addEventListener('click', function() {
  bs.router.navigate('/book/' + bookDetails.id);
});
//ALL VISUAL HOME CODE GOES HERE:


  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);

}

Bookstore.prototype.viewCart = function(doc) {
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);

  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);

  //const cartList = document.querySelector("#cart-list")


  function renderCart(){

      // outputDescript.innerHTML = ((cartList.appendChild(li).firstChild).textContent);
      // outputPrice.innerHTML = ((cartList.appendChild(li).lastChild).textContent);

      // var  descriptionOutput = document.querySelector("#description");
      // descriptionOutput.innerHTML = "<i> " + doc.get("title") + "</i> By: " + doc.get("authorName") + " ";

      // var priceOutput = document.querySelector("#item-price");
      // priceOutput.innerHTML = " $" + doc.get("price");

      var cartRow = document.createElement('div');
      cartRow.classList.add('cart-row')
        var cartRowContents = `
                  <div class="cart-item cart-column">
                    <img class="item-image" src="images/100yr.jpg" width="100" height="200">
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
      //probably need a for loop to creat another row in my code
  }

  renderCart();


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
