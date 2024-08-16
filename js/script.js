$(document).ready(function(){

    // 1. Smooth Scrolling
    $('a').on('click', function(event) {
        if(this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // 2. Product Filtering
    $('#categoryFilter').change(function() {
        var category = $(this).val();
        $('.product-item').hide();
        if (category === 'all') {
            $('.product-item').show();
        } else {
            $('.product-item').each(function() {
                if ($(this).data('category') === category) {
                    $(this).show();
                }
            });
        }
    });

    // 3. Quantity Update in Cart
    $('input[type="number"]').on('change', function() {
        var quantity = $(this).val();
        var price = parseFloat($(this).closest('.item-details').find('.price').text().replace('$', ''));
        var total = quantity * price;
        $(this).closest('.cart-item').find('.total-price').text('$' + total.toFixed(2));
        updateCartTotal();
    });

    function updateCartTotal() {
        var total = 0;
        $('.total-price').each(function() {
            total += parseFloat($(this).text().replace('$', ''));
        });
        $('.cart-summary p').text('Total: $' + total.toFixed(2));
    }

    // 4. Modal Popup for Product Details
    $('.view-details').on('click', function() {
        var productId = $(this).closest('.product-item').data('id');
        // You would typically use AJAX to fetch product details based on the productId
        var productDetails = "Details for product " + productId; // Placeholder content
        $('.modal-body').html(productDetails);
        $('#productModal').show();
    });

    $('.close').on('click', function() {
        $('#productModal').hide();
    });

    $(window).on('click', function(event) {
        if (event.target.id === 'productModal') {
            $('#productModal').hide();
        }
    });

    // 5. AJAX Form Submission for Contact
    $('form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: 'submit_form.php', // Update this to your form handling URL
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                alert('Message sent successfully!');
                $('form')[0].reset(); // Reset the form fields
            },
            error: function() {
                alert('An error occurred. Please try again.');
            }
        });
    });

    // 6. Product Image Gallery
    $('.thumb').on('click', function() {
        var src = $(this).attr('src');
        $('#currentImage').attr('src', src);
    });

    // 7. Adding Items to the Cart with jQuery
    var cartCount = 0;
    $('.btn').on('click', function() {
        cartCount++;
        $('#cart-count').text(cartCount);
        alert('Item added to cart!');
    });

    // 8. Product Carousel
    var currentIndex = 0;
    var items = $('.carousel-item');
    var itemAmt = items.length;

    function cycleItems() {
        var item = $('.carousel-item').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
    }

    $('.next').click(function() {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    $('.prev').click(function() {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });

    setInterval(function() {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    }, 3000);

    // 9. Search Functionality
    $('#search').on('keyup', function() {
        var query = $(this).val().toLowerCase();
        $('#productResults').empty();
        $('.product-item').each(function() {
            var productName = $(this).find('h3').text().toLowerCase();
            if (productName.indexOf(query) !== -1) {
                $('#productResults').append($(this).clone());
            }
        });
    });

    // 10. Tooltips and Popovers
    $('#tooltipButton').tooltip();

});
