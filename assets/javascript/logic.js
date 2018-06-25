// To-do list: add favourites functionality

$('.container-fluid').on('click', '#add-button', function() {

    // Create new GIF button with the value of the user input

    var userSearch = $('#gif-search').val();
    var newButton = $('<button>').text(userSearch).addClass('gif-button btn bg-white mr-2 mb-2');
    $('#button-tray').append(newButton);

});

$('.container-fluid').on('click', '.gif-button', function() {

    // Build API query

    var apiKey = 'zEYRcwolNEd3rEensVCAEcZwhGJ5AHz3';
    var buttonText = $(this).text();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=10&q=' + buttonText;

    // Make AJAX call

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    
    // Create and style new elements, store GIF data from the API response in them, add to the DOM
    
    .then(function(response) {
        console.log(response);
        for (var i= 0; i < 10; i++) {
            var newImg = $('<img>').addClass('content mb-auto').css({'border-bottom': '10px solid black'}).attr({'src': response.data[i].images.original_still.url, 'data-still': response.data[i].images.original_still.url, 'data-gif': response.data[i].images.original.url});
            var newP = $('<p>').addClass('mb-auto mx-auto font-weight-bold').text('Rating: ' + response.data[i].rating.toUpperCase());
            var newDiv = $('<div>').addClass('d-flex flex-column mr-2 mb-2').css({'border': '10px solid black'}).append(newImg, newP);
            $('#gif-tray').prepend(newDiv);
        }
    });

});

// Change between still image and animated GIF on click

$('.container-fluid').on('click', '.content', function() {
    if ($(this).attr('src') === $(this).attr('data-still')) {
        $(this).attr('src', $(this).attr('data-gif'));
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
    }
});