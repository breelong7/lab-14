/* global Cart */
'use strict';


var tbodyEl = document.getElementsByTagName('tbody');

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);

}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  while(tbodyEl.firstChild) {
    tbodyEl.removeChild(tbodyEl.firstChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  for (var i = 0; i < cart.items.length; i++){
    var trEl = document.createElement('tr');
    tbodyEl.appendChild(trEl);
    var tdEl = document.createElement('td');
    tdEl.textContent = 'X';
    trEl.appendChild(tdEl);
    var tdOneEl = document.createElement('td');
    tdOneEl.textContent = cart.items[i].quantity;
    trEl.appendChild(tdEl);
    var tdTwoEl = document.createElement('td');
    tdTwoEl.textContent = cart.items[i].product;
    trEl.appendChild(tdTwoEl);
  }


}

function removeItemFromCart(event) {
  if(event.target.textContent === 'X') {
    tbodyEl.deleteRow();
  }
  cart.saveToLocalStorage();
  renderCart();



}

// This will initialize the page and draw the cart on screen
renderCart();