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
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
        var cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(cartPrice, cartQuantity)
    }
}