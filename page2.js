document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username'); 
    if (username) {
        document.querySelector('.player-name').textContent = username;
    }
});
