$(document).ready(function() {
    // Extract the product ID from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch product data from the JSON file
    $.getJSON('../data/products.json', function(data) {
        if (productId > 0 && productId <= data.products.length) {
            const product = data.products[productId - 1];

            if (product) {
                // Update the product details on the page
                $('#product-name').text(product.name);
                $('#product-price').text(`$${product.price.toFixed(2)}`);
                $('#product-description').text(product.description);
                $('#product-image').attr('src', product.image);
                $('#product-rating').html('★'.repeat(product.rating || 0));

                // Ensure the reviews array exists
                if (!product.reviews) {
                    product.reviews = [];
                }

                // Load existing reviews
                updateReviews(product.reviews);

                // Handle review submission
                $('#review-form').on('submit', function(e) {
                    e.preventDefault();

                    const newReview = {
                        user: $('#review-user').val(),
                        comment: $('#review-comment').val(),
                        rating: parseInt($('#review-rating').val())
                    };

                    // Add new review to the product reviews array
                    product.reviews.push(newReview);

                    // Clear form fields
                    $('#review-user').val('');
                    $('#review-comment').val('');
                    $('#review-rating').val('5');

                    // Update reviews section
                    updateReviews(product.reviews);
                });
            }
           $('.add-to-cart').attr('data-name', product.name)
                                 .attr('data-price', product.price);
            }
         else {
            // Handle invalid or missing product ID
            $('#product-name').text('Product not found');
            $('#product-price').text('$0.00');
            $('#product-description').text('Product description goes here.');
            $('#product-rating').html('★★★★★ (0 based on 0 reviews)');
        }
    }).fail(function() {
        console.error('Failed to load JSON data.');
        $('#product-name').text('Error loading product details');
        $('#reviews-list').empty().append('<p>Error loading reviews.</p>');
    });

    function updateReviews(reviews) {
        const reviewsList = $('#reviews-list');
        reviewsList.empty();

        if (reviews && reviews.length > 0) {
            reviews.forEach(function(review) {
                reviewsList.append(`
                    <div class="review">
                        <h4>${review.user}</h4>
                        <p>${review.comment}</p>
                        <p>Rating: ${'★'.repeat(review.rating)}</p>
                    </div>
                `);
            });
        } else {
            reviewsList.append('<p>No reviews yet.</p>');
        }
    }
});
