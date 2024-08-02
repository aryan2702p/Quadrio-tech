async function login_user(data) {
    console.log("userlogin function called");
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log("User logged in successfully.");
            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.token);
            const role = data.role;
            if(role == 'admin'){
                window.location.href = '/dashboard';
            }else{
                 // Redirect to the index page
            window.location.href = '/list';

            }

           
          } else {
            console.error('Login failed:', await response.json());
          }

    } catch (error) {
        console.error('Error saving layer data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');


    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Collect user input
        const email = emailInput.value;
        const password = passwordInput.value;

        // Example URL where your server API endpoint might be
        //const url = 'https://example.com/login';

        // Example data format assuming your server expects JSON
        const data = {
            email: email,
            password: password
        };
        login_user(data);
        
        // Example fetch request to send data to server

    });
});