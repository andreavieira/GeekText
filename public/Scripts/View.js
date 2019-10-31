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

Bookstore.prototype.viewCart = function() {
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);

  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);
}

<<<<<<< HEAD
Bookstore.prototype.viewBookDetails = function(doc, bReviews) {
=======
/**
Book Details: Fetches attributes of a given book by ID
 */
Bookstore.prototype.viewBookDetails = function(doc) {
>>>>>>> upstream/master
  var bookDetails = document.querySelector('#book-details').cloneNode(true);

  var bookTitle = bookDetails.querySelector(".book-title");
  bookTitle.innerHTML = "<strong> Title: </strong>" + doc.get("BookTitle");

  var author = bookDetails.querySelector(".author-fn");
  author.innerHTML = "<strong> Author: </strong> " + doc.get("AuthorFn") + " " +doc.get("AuthorLn") ;

<<<<<<< HEAD
  /**
  let query = doc.collection("Reviews").get()
    .then(snapshot => {
      if(snapshot.empty) {
        //NO REVIEWS
        return;
      }
      snapshot.forEach(doc => {
          bReviews.push(doc.data());
      });
    }).catch(err => {
        console.log("Error getting reviews: ", err);
    });*/
=======
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
>>>>>>> upstream/master

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
