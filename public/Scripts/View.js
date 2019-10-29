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
//ALL VISUAL HOME CODE GOES HERE:
  var me = this;
  var bookDetails = homePage.querySelector('.book-details-link');


  bookDetails.addEventListener('click', function() {
    me.router.navigate('/book/' + bookDetails.id);
  });



  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);

}

Bookstore.prototype.viewCart = function() {
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);

  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);
}

Bookstore.prototype.viewBookDetails = function(bid) {
  //RENDER BOOK DETAILS HERE
  var bookDetails = document.querySelector('#book-details').cloneNode(true);


  var rating = 0;
  var dialog = bookDetails.querySelector('#add-review-section');
  this.renderRating(bid, dialog);










  bookDetails.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), bookDetails);
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

Bookstore.prototype.renderRating = function(bid, dialog) {

  //GET RATINGS OF BOOK
  let reviewRef = db.collection("bookdetails").doc(bid).collection("Reviews");
  let bReviews = [];
  let query = reviewRef.get()
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
    });



  /*dialog.querySelectorAll('star-input i').forEach(function(el) {
    var rate = function() {
      var after = false;
      rating = 0;
      [].slice.call(el.parentNode.children).forEach(function(child) {
        if(!after) {
          rating++;
          child.innerText = 'star';
          console.log('innerText= star');
        } else {
          child.innerText = 'star_border';
        }
        after = after || child.isSameNode(el);
      });
    };
    el.addEventListener('mouseover',rate);
  });

  dialog.querySelectorAll('star-input i').forEach(function(child) {
    var img = document.createElement('img');
    if(child.innerText == 'star') {
      img.src = '/images/star-rating-filled.png';
    } else {
      img.src = '/images/star-rating-border.png';
    }
    img.width = 50;
    img.height = 50;
    child.appendChild(img);
  });*/
}
