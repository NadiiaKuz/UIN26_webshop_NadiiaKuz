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

//Legg til i handlevogn
function addToCart(prodid) {
    console.log("Legg til produkt med id: " + prodid)
    cart.push(prodid)
    console.log(cart)
    document.getElementById("cart-quantity").innerHTML = cart.length
}