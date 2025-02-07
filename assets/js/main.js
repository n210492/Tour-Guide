// Variable Declaration

    const loginBtn = document.getElementById("#login");
    const registerBtn = document.getElementById("#register");
    const loginForm = document.getElementById(".login-form");
    const registerForm = document.getElementById(".register-form");

// Login button function

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor="#21264D";
    registerBtn.style.backgroundColor="rgba(255,255,255,0.2)";
    loginForm.style.left="50%";
    registerForm.style.left="-50%"
});

// Register button function
registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor="rgba(255,255,255,0.2)";
    registerBtn.style.backgroundColor="#21264D"

    loginForm.style.left="150%";
    registerForm.style.left="50%"
})