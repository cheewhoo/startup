document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('newlogin').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        var username = document.getElementById('name').value; // Get the username input value
        
        localStorage.setItem('username', username); // Save the username in local storage
        
        // Redirect to play.html or perform any other action as needed
        window.location.href = 'play.html';
    });
});
