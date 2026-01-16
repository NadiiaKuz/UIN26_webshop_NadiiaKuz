document.getElementById("cart-button").addEventListener("click", function() {
    document.getElementById("cart").classList.toggle("hidden")
})

//funksjon for produktopplisting:
function fetchProducts(){
    let productHTML = ""

    products.map(p => productHTML += `<article class="product-card">
                <img src="website_images/PROD_${p.imagefile}" alt="${p.title}">
                <a href="#">${p.category}</a>
                <h3>${p.title}</h3>
                <p>Kr. ${p.price},-</p>
                <button onClick="addToCart(${p.prodid})">Ligg til handlevogn</button>
                </article>`)
    // products.map(p => console.log(p.title))
    document.getElementById("product-list").innerHTML = productHTML
}

fetchProducts()

//generer handlevogn
function showCart(){
    //unike produkter
    let uniqueItems = new Set(cart) //streng med unike verdier
    let uniqueArray = [...uniqueItems]
    //oversikt over antal produkt
    let cartItems = []
    uniqueArray.map(item => {
        cartItems.push({prodid: item, quantity: cart.filter(i => i === item).length})
    })

    //console.log(cartItems)

    //gå gjennom cartItems for å lage HTML til handlevogn og regne ut totalpris
    let cartHTML = ""
    let totalPrice = 0
    
    cartItems.map(ci => {
        //hente produktinformasjon
        let product = products.find(i => i.prodid === ci.prodid)
        //skrive ut HTML
        cartHTML += `<tr>
                        <td class="title">${product.title}</td>
                        <td class="price">${product.price * ci.quantity}</td>
                        <td class="quantity">${ci.quantity}</td>
                        <td class="delete"><button onClick="deleteFromCart(${product.prodid})">X</button></td>
                    </tr>`
        //summere total pris
        totalPrice += Number(product.price) * Number(ci.quantity)
    })

    if(cart.length === 0){
        cartHTML += "<tr><td>Ingen varer i handlevognen enda</td></tr>"
    }
    //oppdaterer HTML ellement
    document.getElementById("cart-items").innerHTML = cartHTML
    document.getElementById("total-price").innerHTML = totalPrice
    document.getElementById("cart-quantity").innerHTML = cart.length
}

//slette fra handlevogn
function deleteFromCart(prodid){
    let deleteIndex = cart.indexOf(prodid)
    if(deleteIndex > -1) {
        cart.splice(deleteIndex, 1)
    }
    //oppdatere handlevogn-utscrift
    showCart()
}

//Legg til i handlevogn
function addToCart(prodid) {
    console.log("Legg til produkt med id: " + prodid)
    cart.push(prodid)
    console.log(cart)

    //oppdater handlevognvisning
    showCart()
}