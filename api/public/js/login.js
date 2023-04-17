// @ts-nocheck
const form = document.querySelector('form');
form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;

    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);

    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });

    const text = await response.text();
    let errorElement = form.querySelector('.error-message');

    if (text === 'success') {
        // Login successful, redirect to home page
        window.location.href = '/user/validate';
    } else {
        // Login failed, display error message
        const errorMessage = text;
        if (!errorElement) {
            // Create the error message element if it doesn't exist
            errorElement = document.createElement('p');
            errorElement.classList.add('error-message');
            form.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        errorElement.style.color = 'red';
    }
});
