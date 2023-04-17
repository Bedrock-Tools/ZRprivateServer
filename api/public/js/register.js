// @ts-nocheck
const form = document.querySelector('form');
form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const password2 = form.elements.password2.value;
    const hcaptchaResponse = form.elements['h-captcha-response'].value;

    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    data.append('password2', password2);
    data.append('h-captcha-response', hcaptchaResponse);

    const response = await fetch('/user/register', {
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
        window.location.href = '/user/login?r=s';
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
