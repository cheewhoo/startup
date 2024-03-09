document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var username = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    if(username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return;
    }
    localStorage.setItem('username', username); 
    window.location.href = 'play.html';
});
