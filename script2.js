// Sample PS4 Game CDs
const products = [
    { id: 1, name: "God of War", price: 25, img: "gow.jfif" },
    { id: 2, name: "Spider-Man", price: 19, img: "sm.jfif" },
    { id: 3, name: "Uncharted 4", price: 50, img: "u4.jfif" },
  ];
  
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Save cart
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Update cart count
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
  }
  
  // Render products on homepage
  function renderProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;
  
    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
  
  // Add to cart
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
  
    if (item) {
      item.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartCount();
  }
  
  // Render cart items
  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
    if (!cartItems) return;
  
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartItems.appendChild(div);
    });
  
    cartTotal.textContent = total.toFixed(2);
  }
  
  // Checkout
  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("✅ Thank you for purchasing PS4 Games!");
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
  }
  
  // Init
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart();
    updateCartCount();
  
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
  });
  