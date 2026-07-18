    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const usernameError = document.getElementById("usernameError");



    let eyeicon = document.getElementById("eyeicon");

          eyeicon.onclick = function(){
            if(password.type == "password"){
                password.type = "text";
                eyeicon.src = "eye-open.png";
            }else{
                password.type = "password";
                eyeicon.src = "eye-close.png";
            }
          }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        emailError.textContent = "";
        passwordError.textContent = "";
        let valid = true;

        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(username.value.trim() === "") {
                usernameError.textContent = "Username is required";
                valid = false;

            }else if (username.value.length < 5) {
                usernameError.textContent = "Username must be at least 5 characters";
                valid = false;
            }

            if(email.value.trim() === "") {
                emailError.textContent = "Email is required";
                valid = false;
            }else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = "Enter a valid email";
                valid = false;
            }

            if(password.value.trim() === "") {
                passwordError.textContent = "Password is required";
                valid = false;

            }else if (password.value.length < 8) {
                passwordError.textContent = "Password must be at least 8 characters";
                valid = false;
            }
    });