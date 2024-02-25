document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var username = document.getElementById('name').value; 
    localStorage.setItem('username', username); 
    window.location.href = 'play.html';
});
