

function Bookstore() {

  var me = this;
  me.initTemplates();
  me.initRouter();
  me.viewHeader();
  //SECURITY CODE GOES here
}

//NAVIGATION CODE
/**
  initializes the router and dictates what navigation string
  leads to what render function.
  Current render functions:
  viewHeader()
  viewCart()
  viewHome()

  HOW TO USE:
  when you need to navigate to another page, call
  this.router.navigate('NAVIGATION_STRING');

*/
Bookstore.prototype.initRouter = function() {
  this.router = new Navigo();
  var that = this;
  this.router
  .on({
    '/': function() { // navigation string '/' leads to viewHome()
      that.viewHome();
    }
  }).resolve();

  this.router
  .on({
    '/cart': function() {
      that.viewCart();
    }
  }).resolve();


  //FIRESTORE LOAD COLLECTIONS
  return this.router;
}



Bookstore.prototype.getCleanPath = function(dirtyPath) {
  if(dirtyPath.startsWith('/index.html')) {
    return dirtyPath.split('/').slice(1).join('/');
  } else {
    return dirtyPath;
  }
};

window.onload = function() {
  window.app = new Bookstore();
}
