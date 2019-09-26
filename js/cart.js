/* global Cart */
'use strict';


var tbodyEl = document.querySelector('tbody');

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

// helper function
function addElement(element, content, parent){
  var newElement = document.createElement(element);
  if(content){
    var newContent = document.createTextNode(content);
    newElement.appendChild(newContent);
  }
  parent.appendChild(newElement);
  return newElement;
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  for (var i = 0; i < cart.items.length; i++){
    var trEl = addElement('tr', false, tbodyEl);
    var tdEl = addElement('td', false, trEl);
    var input = addElement('input', false, tdEl);
    input.setAttribute('type', 'button');
    input.setAttribute('value', 'X');
    addElement('td', cart.items[i].quantity, trEl);
    addElement ('td', cart.items[i].product, trEl);
  }
}

function removeItemFromCart(event) {
  for (var i = 0; i < cart.items.length; i++){
    if(event.target.value === 'X') {
      tbodyEl.deleteRow( event.target.parentNode.parentNode.rowIndex );
    }

  }
  cart.saveToLocalStorage();
  renderCart();

}

// function deleteRow(btn) {
//   var row = btn.parentNode.parentNode;
//   row.parentNode.removeChild(row);
// }

// function deleteRow(r) {
//   var i = r.parentNode.parentNode.rowIndex;
//   tbodyEl.deleteRow(i);
// }
// This will initialize the page and draw the cart on screen
renderCart();