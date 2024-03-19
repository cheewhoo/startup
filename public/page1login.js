document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    var username = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    if(username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('username', username); 
            window.location.href = 'play.html';
        } else {
            const errorData = await response.json();
            alert(errorData.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    }
});
