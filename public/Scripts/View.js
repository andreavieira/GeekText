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
  var me = this;
  var cartButton = document.querySelector('#cart-btn');
  cartButton.addEventListener('click', function(event) {
    me.router.navigate('/cart');
  });
  var homeButton = document.querySelector('#home-btn');
  homeButton.addEventListener('click', function(event) {
    me.router.navigate('/');
  });

  var headerEl = document.querySelector('#main-header');
  headerEl.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), headerEl);
}


Bookstore.prototype.viewHome = function() {
  var mainEl = this.renderTemplate('homepage');
  this.replaceElement(document.querySelector('main'), mainEl);

}

Bookstore.prototype.viewCart = function() {
  var mainEl = this.renderTemplate('shopping-cart');
  this.replaceElement(document.querySelector('main'), mainEl);
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
