var removeCartItemButtons = document.querySelector('.btn-danger')
console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.lenght; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function() {
    console.log('clicked')
    })
}