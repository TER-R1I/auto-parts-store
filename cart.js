// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция сохранения корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Обновление количества товаров в корзине
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-count-cart').textContent = count;
}

// Добавление товара в корзину
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart();
    alert('Товар добавлен в корзину!');
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
}

// Обновление количества товара
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        renderCartItems();
    }
}

// Отрисовка товаров в корзине
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        totalPriceContainer.textContent = '0';
        return;
    }

    let totalPrice = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
