let carts = document.querySelectorAll('.add-to-cart'); // alla add-to-cart knappar

let products = [ //sparar alla varor
    {
        name:'Nike Shoes',
        tag: 'nikeshoe',
        price: 199,
        inCart: 0
    },
    {
        name:'Adidas Shoes',
        tag: 'adidasshoe',
        price: 299,
        inCart: 0
    }
    
]

for (let i=0; i < carts.length; i++){ //loopar igenom alla varor i shoppen
    carts[i].addEventListener('click', () => { //hämtar priset samt 
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.div-cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers); //konverterar string till nummer
    if(productNumbers) { // om det redan finns en vara i varukorgen
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.div-cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);//första gången man lägger till en vara i varukorgen
        document.querySelector('.div-cart span').textContent = 1;
    }
setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); //Gör om den till js språk igen från JSON

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
    }
    
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost')
    

    if(cartCost != null) { //om varukorgen inte är noll(null) vill vi ha kvar den gamla summan + den nya
        cartCost = parseInt(cartCost); //för att ändra från string till nummer 
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem('totalCost', product.price);//för att spara priset från en vara
    }

    
}

function displayCart() {
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems); //konvertera till js obejcts från JSON
let cartRow = document.querySelector('.cart-items')//om cart-rox existerar på sidan kör denna kod
let cartCost = localStorage.getItem('totalCost')

if (cartItems && cartRow)//om vi har något på localstorage samt är på varukorgssidan
 {
    cartRow.innerHTML = '';
    Object.values(cartItems).map(item => {  //lägger till en knapp när en vara dyker upp varukorgen
        cartRow.innerHTML += `
        <div class="product"> 
        <ion-icon name="close-circle-outline"></ion-icon>
        <img src=itemitem>
        <span>${item.name}</span>
        </div>
        <div class="price">${item.price},00 SEK</div>
        <div class="quantity">
        <ion-icon name="arrow-back-circle-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="arrow-forward-circle-outline"></ion-icon>
        </div>
        <div class="total">${item.inCart * item.price},00 SEK
        </div>
        `;
       
    });
    cartRow.innerHTML += `
    <div class="cart-total">
    <h2 class="cart-total-title">
    Total:
    </h2>
    <h2 class="cart-total-number">
    ${cartCost},00 SEK
    </h2>
    </div>
    `

}

}

onLoadCartNumbers();
displayCart(); //kör så fort sidan är laddad