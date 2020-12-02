// remove button
var removeBtnCart = document.getElementsByClassName('btn-remove')
console.log(removeBtnCart)

for (var i = 0; i < removeBtnCart.length; i++) {
    var removeButton = removeBtnCart[i]
    removeButton.addEventListener('click', function(event) {
        var removeClicked = event.target
        removeClicked.parentElement.parentElement.remove() //remove parent1 och 2
    })
}