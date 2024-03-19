document.getElementById('newlogin').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    var username = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    if(username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch('/auth/create', {
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
            alert(errorData.msg || 'Account creation failed');
        }
    } catch (error) {
        console.error('Error during account creation:', error);
        alert('An error occurred during account creation. Please try again later.');
    }
});
