// remove button
var removeBtnCart = document.getElementsByClassName('btn-remove')
for (var i = 0; i < removeBtnCart.length; i++) {
    var removeButton = removeBtnCart[i]
    removeButton.addEventListener('click', function(event) {
        // -- removes parent1 and 2
        var removeClicked = event.target
        removeClicked.parentElement.parentElement.remove()
        // -- update Total price (updateCartTotal)
        updateCartTotal()
    })
}

// function for (updateCartTotal)
function updateCartTotal() {
    //returns an array of elements - [0] = first array
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]

    //cart-row inside cart-items (cartItemContainer)
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var totalPrice = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
        var cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]

        // innerText from .cart-price and remove the '$' from the string
        // parseFloat = turns a string to a Float (number with decimals)
        var price = parseFloat(cartPrice.innerText.replace('$', ''))

        // get the value from cartQuantity (.cart-quantity-input)
        // since its an <input> element we need the value from it
        var quantity = cartQuantity.value
        totalPrice = totalPrice + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = totalPrice + ' SEK'
}