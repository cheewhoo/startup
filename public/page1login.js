document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    var username = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    
    if(username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Call the function to get the user from the database
        const user = await getUser(username);

        // If user exists and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            localStorage.setItem('username', username); 
            window.location.href = 'play.html';
        } else {
            alert("Account does not exist. Please create an account");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});
