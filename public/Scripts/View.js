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

/** HEADER SCRIPTS */
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

/** HOME SCRIPTS */
Bookstore.prototype.viewHome = function() {
  var homePage = document.querySelector('#home-page').cloneNode(true);
  let bs = this;
  var bookDetails = homePage.querySelector('.book-details-link');
  bookDetails.addEventListener('click', function() {
    bs.router.navigate('/book/' + bookDetails.id);
  });
  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);

  // const bookDocRef = db.collection("bookdetails")
  // const outputDescript = document.querySelector("#description")
  // const outputImage = document.querySelector("#item-image")
  // const outputPrice = document.querySelector("#item-price")
  // const dlist = document.querySelector("#cart-row")

  // function renderCart(doc){
  //     let li = document.createElement('li');  
  //     let description = document.createElement('div');
  //     let price = document.createElement('div'); 
  //     //let image = document.createElement('div');

  //     li.setAttribute('data-id', doc.id);                  

  //     title = doc.get("BookTitle");      
  //     authorFn = doc.get("AuthorFn");  
  //     authorLn = doc.get("AuthorLn");
  //     //image = doc.get("image");
      
  //     let bkPrice= doc.get("Price");       
  //     price.textContent = "$" + bkPrice;    
  //     description.textContent = " " + title + " By: " + author + " ";     

  //     li.appendChild(description);        
  //     li.appendChild(price);

  //     outputDescript.innerHTML = ((cartList.appendChild(li).firstChild).textContent);
  //     outputPrice.innerHTML = ((cartList.appendChild(li).lastChild).textContent);
  // }

  // getRealtimeUpdates = function(){
  //     let i = 0;
  //     let allItems = bookDocRef.get()
  //         .then(snapshot => {
  //             snapshot.forEach(doc =>{
  //                 console.log(doc.id, '=>', doc.data());
  //                 renderCart(doc);
  //             });
  //         })
  //         .catch(err =>{
  //             console.log('Error getting documents', err);
  //         });
  // }

  // getRealtimeUpdates();

  // //waits for document to load
  // if (document.readyState == 'loading'){
  //     document.addEventListener('DOMContentLoaded', ready)
  // } else {
  //     ready()
  // }
}

<<<<<<< HEAD
/** SHOPPING SCRIPTS */
Bookstore.prototype.viewCart = function() {
=======
Bookstore.prototype.viewCart = function(doc) {
>>>>>>> b37898d763d8314644712828cad0b70abfddf581
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);

  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);

  //const cartDocRef = this.collection("users").doc("nrodr047").collection("cart")
  const outputDescript = document.querySelector("#description")
  //const outputImage = document.querySelector("#item-image")
  const outputPrice = document.querySelector("#item-price")
  const cartList = document.querySelector("#cart-list")

  function renderCart(){
      let li = document.createElement('li');                  //creates a line for the nodes
      let description = document.createElement('div');       //creates a span for title/author
      let price = document.createElement('div');             //creates a span for price
      //let image = document.createElement('div');

      li.setAttribute('data-id', doc.id);                     //sets the data-id to the doc.id for parent node
<<<<<<< HEAD

      title = doc.get("title");                               //gets the title field from database
      author = doc.get("authorName");                         //gets authorname from database
=======
      
      let bkTitle = doc.get("title");                               //gets the title field from database
      let author = doc.get("authorName");                         //gets authorname from database
>>>>>>> b37898d763d8314644712828cad0b70abfddf581
      //image = doc.get("image");
      
      let bkPrice= doc.get("price");                          //tmp var for price from database
      price.textContent = "$" + bkPrice;                      //sets price with '$'
      description.textContent = " " + bkTitle + " By: " + author + " ";     //sets description to title and author

      li.appendChild(description);                                //appends decription to node
      li.appendChild(price);

      outputDescript.innerHTML = ((cartList.appendChild(li).firstChild).textContent);
      outputPrice.innerHTML = ((cartList.appendChild(li).lastChild).textContent);
      //probably need a for loop to creat another row in my code
  }

  renderCart();


  //Eventlistener constructors
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

  //Function calls the updateCartTotal function when remove button is clicked.
  //@param {*} event even when remove button is clicked
  function removeCartItem(event){
      var buttonClicked = event.target
      let id = buttonClicked.parentElement.parentElement.get(doc.id);
      db.collection('users').doc('nrodr047').collection('cart').doc(id).delete();
      updateCartTotal();
  }

  //Checks if inputted value is an int greater than 1 and calls updateCartTotal.
  //@param {*} event used when quantity value is changed 
  function quanityChanged(event){
      var input = event.target                        //changed event
      if (isNaN(input.value) || input.value <=0){     //if input is not an int or <0
          input.value = 1                             //change value to 1
      }
      updateCartTotal()                               //update cart total
  }

  //Function calculates cart total based on quantity and price
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

/** BOOK DETAILS SCRIPTS */
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