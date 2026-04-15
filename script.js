const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products
function renderProducts(data) {
    productList.innerHTML = "";

    data.forEach(p => {
        productList.innerHTML += `
            <div class="product">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Search + Filter
function filterProducts() {
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    if (categoryFilter.value !== "all") {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
    }

    renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Cart Modal
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
    displayCart();
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });

    totalEl.innerText = total;
}

// Init
renderProducts(products);
updateCartCount();