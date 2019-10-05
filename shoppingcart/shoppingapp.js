//waits for document to load
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

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

    var quanityInputs = document.getElementsByClassName('car-quantity-input')
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
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
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
    for (var i = 0; i < cartRows.length;i++){                               //loops through all items
        var cartRow = cartRows[i]                                           //gets item in current cart row
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]  //all elements within the cart-price class
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //all elements within quantity input class
        var price = parseFloat(priceElement.innerText.replace('$',''))      //gets the string from the input text, removes $, and changes to float
        var quantity = quantitElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100                                   //rounds total price
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //calculate total price, adds $ to string



    //FIX ME!! - ADD TO CART BUTTON
}