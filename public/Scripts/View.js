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

Bookstore.prototype.viewBookDetails = function(bid) {
  var bookDetails = document.querySelector('#book-details').cloneNode(true);

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
