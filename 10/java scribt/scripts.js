
const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');
const homeSection = document.getElementById('home-section');
const userNameDisplay = document.getElementById('user-name');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registerError = document.getElementById('register-error');
const loginError = document.getElementById('login-error');

function showSection(section) {
    registerSection.style.display = 'none';
    loginSection.style.display = 'none';
    homeSection.style.display = 'none';
    section.style.display = 'block';
}

document.getElementById('login-link').addEventListener('click', () => showSection(loginSection));
document.getElementById('register-link').addEventListener('click', () => showSection(registerSection));

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    
    if (localStorage.getItem(email)) {
        registerError.textContent = 'Email is already registered!';
    } else {
       
        localStorage.setItem(email, JSON.stringify({ name, password }));
        alert('Registration successful! Redirecting to login.');
        showSection(loginSection);
    }
});


loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        
        userNameDisplay.textContent = user.name;
        alert('Login successful! Redirecting to home.');
        showSection(homeSection);
    } else {
        loginError.textContent = 'Invalid email or password!';
    }
});

document.getElementById('logout').addEventListener('click', function () {
    alert('Logged out!');
    showSection(loginSection);
});

if (localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userNameDisplay.textContent = currentUser.name;
    showSection(homeSection);
} else {
    showSection(registerSection);
}
