// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счётчика товаров
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Обновляем счётчик в шапке
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }

    // Обновляем счётчик на странице корзины
    const cartCountCart = document.getElementById('cart-count-cart');
    if (cartCountCart) {
        cartCountCart.textContent = count;
    }
}

// Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Отрисовка товаров в корзине
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    if (!cartItemsContainer) return;

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
            <p>${item.price} руб. × ${item.quantity} = ${itemTotal} руб.</p>
                </div>
                <div class="cart-item-actions">
            <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>`;
    }).join('');

    totalPriceContainer.textContent = totalPrice;
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

// Обработчик формы заказа !НАЧАЛО КОДА!
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
// Обработчик формы заказа
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCartItems();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Корзина пуста!');
                return;
            }
            const name = document.getElementById('customer-name').value;
            const phone = document.getElementById('customer-phone').value;
            const email = document.getElementById('customer-email').value;

            alert(`Заказ оформлен!\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}`);
            cart = [];
            saveCart();
            renderCartItems();
        });
    }
});
