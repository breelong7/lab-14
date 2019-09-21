/* global Product, Cart */

'use strict';
 

// Set up an empty cart for use on this page.
var cart = new Cart([]);
var cartArr = [];
var cartContentsEl = document.getElementById('cartContents');

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var allEl = document.createElement('option');
    allEl.textContent = Product.allProducts[i].name;
    allEl.value = Product.allProducts[i].name;
    selectElement.appendChild(allEl);


  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // TODO: Prevent the page from reloading

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

var product;
var quantity;
// var product;
// var quantity;
// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  product = event.target.items.value;
  quantity = parseInt(event.target.quantity.value);

  var newCartItem = new CartItem (product, quantity);

  cartArr.push(newCartItem);

  localStorage.setItem('cart', JSON.stringify(cartArr));

  return quantity;
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
var total = 0;
function updateCounter() {
  for(var i = 0; i < cartArr.length; i++){
    total += cartArr[i].quantity;
    console.log('counter total is:', total, 'array at i quantity', cartArr[i].quantity);
  }

}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // addSelectedItemToCart();
  // updateCounter();
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
 
  var pEl = document.createElement('p');
  cartContentsEl.appendChild(pEl);

  for(var i = 0; i < cartArr.length; i++){
    pEl.textContent = `Selected products:${product} Quantity:${quantity}`;
  }
  var pTwoEl = document.createElement('p');
  pTwoEl.textContent = `Total number of items ${total}`;
  cartContentsEl.appendChild(pTwoEl);


}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);



// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();