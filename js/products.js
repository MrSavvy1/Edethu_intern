$(document).ready(function() {
    $('.hamburger').click(function() {
        $('nav').toggleClass('active');
    });


    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add item to cart
    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        const name = $(this).data('name');
        const price = $(this).data('price');

        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
    });

    // Display cart items
    function displayCart() {
        const cartContainer = $('.cart-items');
        cartContainer.html('');

        if (cart.length === 0) {
            cartContainer.html('<p>Your cart is empty.</p>');
        } else {
            cart.forEach((item, index) => {
                cartContainer.append(`
                    <div class="cart-item">
                        <h3>${item.name}</h3>
                        <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                        <p class="quantity">Quantity: ${item.quantity}</p>
                        <span class="remove" data-index="${index}">Remove</span>
                    </div>
                `);
            });
        }
    }

    // Remove item from cart
    $('.cart-items').on('click', '.remove', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    });

    // Initialize cart display
    displayCart();
});
