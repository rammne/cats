$(document).ready(function() {
    // Random cat
    $('#randomCat').click(function() {
        updateCatImage('/random');
    });

    // Cat by tag
    $('#catByTag').click(function() {
        const tag = $('#tagInput').val();
        if (tag) {
            updateCatImage(`/tag/${tag}`);
        }
    });

    // Cat saying text
    $('#catSaying').click(function() {
        const text = $('#textInput').val();
        if (text) {
            updateCatImage(`/says/${text}`);
        }
    });

    // Cat with tag saying text
    $('#catWithTagSaying').click(function() {
        const tag = $('#tagTextInput').val();
        const text = $('#sayingTextInput').val();
        if (tag && text) {
            updateCatImage(`/tag/${tag}/says/${text}`);
        }
    });

    // Cat by type
    $('#catByType').click(function() {
        const type = $('#typeSelect').val();
        updateCatImage(`/type/${type}`);
    });

    // Cat by filter
    $('#catByFilter').click(function() {
        const filter = $('#filterSelect').val();
        updateCatImage(`/filter/${filter}`);
    });
});

function updateCatImage(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
            if (response.error) {
                $('.cat-display').html(`<div class="error-message">${response.error}</div>`);
            } else {
                const catData = response.data;
                const img = $('<img>', {
                    id: 'catImage',
                    src: catData.url,
                    alt: 'Cat'
                });
                
                const info = $('<div>', {
                    class: 'cat-info'
                }).append(
                    $('<p>').text('Tags: ' + catData.tags.join(', ')),
                    $('<p>').text('Created: ' + new Date(catData.created_at).toLocaleDateString())
                );

                $('.cat-display').html('').append(img, info);
            }
        },
        error: function() {
            $('.cat-display').html('<div class="error-message">Error fetching cat image</div>');
        }
    });
} 