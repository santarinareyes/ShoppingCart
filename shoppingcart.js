// remove button
var removeBtnCart = document.getElementsByClassName("btn-remove");
for (var i = 0; i < removeBtnCart.length; i++) {
  var removeButton = removeBtnCart[i];
  removeButton.addEventListener("click", removeCartItem)
}

function removeCartItem(event) {

  // -- removes parent1 and 2
  var removeClicked = event.target;
  removeClicked.parentElement.parentElement.remove();

  // -- update Total price (updateCartTotal)
  updateCartTotal();
}

// function for ()
// updates total when you change quantity.
// quantity should not go below 1
var quantityInput = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target

    // NaN = not a number
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


// function for (updateCartTotal)
// updates total when you remove item
function updateCartTotal() {
  //returns an array of elements - [0] = first array
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];

  //cart-row inside cart-items (cartItemContainer)
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var totalPrice = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var cartPrice = cartRow.getElementsByClassName("cart-price")[0];
    var cartQuantity = cartRow.getElementsByClassName("cart-quantity-input")[0];

    // innerText from .cart-price and remove the '$' from the string
    // parseFloat = turns a string to a Float (number with decimals)
    var price = parseFloat(cartPrice.innerText.replace("$", ""));

    // get the value from cartQuantity (.cart-quantity-input)
    // since its an <input> element we need the value from it
    var quantity = cartQuantity.value;
    totalPrice = totalPrice + price * quantity;
  }
  // 2 decimals + SEK
  totalPrice = Math.round(totalPrice * 100) / 100

  document.getElementsByClassName("cart-total-price")[0].innerText =
    totalPrice + " SEK";
}

/////////////////////////////////////////
/////////////////////////////////////////
// add to cart
var addToCartBtn = document.getElementsByClassName('btn-add-to-cart')
for (var i = 0; i < addToCartBtn.length; i++) {
    var addBtn = addToCartBtn[i]
    addBtn.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    var addBtn = event.target
    var product = addBtn.parentElement.parentElement
    var productTitle = product.getElementsByClassName('product-title')[0].innerText
    var productPrice = product.getElementsByClassName('price')[0].innerText
    var productImage = product.getElementsByClassName('product-image')[0].src

    // add another row in cart on click
    addItemToCart(productTitle, productPrice, productImage)
    updateCartTotal()
}

//function for addItemToCart
function addItemToCart(productTitle, productPrice, productImage) {
    var cartRow = document.createElement('div')
    
    // to get the same style as 'cart-row'
    cartRow.classList.add('cart-row')

    // function to stack products instead of adding a new row  
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var stackProducts = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < stackProducts.length; i++) {

      // if innerText of productTitle is the same = we have already added that item to the cart 
      if (stackProducts[i].innerText == productTitle) {
        alert('This item is already added to the cart')
        return
    }
  }
    var cartRowElements = `
      <div class="cart-item">
        <img class="cart-item-image" src=${productImage} width="100" height="100">
        <span class="cart-item-title">${productTitle}</span>
       </div>
        <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-remove" type="button">REMOVE</button>
      </div>`

    // innerHTML because we are using HTML
    cartRow.innerHTML = cartRowElements
    cartItems.append(cartRow)

    // remove button on newly added products did not work - fix
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)

    // quantity-input on newly added products did not work - fix
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}