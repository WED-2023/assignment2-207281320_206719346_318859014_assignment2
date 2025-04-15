$(document).ready(function() {
    // Get the dialog modal
    var modal = $('#aboutDialog');

    // Get the button that opens the modal
    var btn = $('#aboutBtn');

    // Get the close button that closes the modal
    var closeBtn = $('.close-btn');

    // When the user clicks the "About" button, open the modal
    btn.on('click', function() {
        modal[0].showModal(); // Open the dialog using the showModal() method
    });

    // When the user clicks the "X" close button, close the modal
    closeBtn.on('click', function() {
        modal[0].close(); // Close the dialog using the close() method
    });

    // When the user clicks anywhere outside the modal, close it
    $(window).on('click', function(event) {
        if (event.target === modal[0]) {
            modal[0].close(); // Close modal if clicked outside
        }
    });

    // When the user presses the ESC key, close the modal
    $(document).on('keydown', function(event) {
        if (event.key === 'Escape') {
            modal[0].close(); // Close modal when ESC is pressed
        }
    });
});
