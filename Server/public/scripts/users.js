/**
 * Update user
 * Used to update user when submitting update user form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-user').forEach(button => {
  button.addEventListener('click', (e) => {
    const userId = button.getAttribute('userId');
    const form = document.querySelector(`#update-user-form-${userId}`);

    const usernameElement = form.querySelector(`#username-${userId}`);
    const passwordElement = form.querySelector(`#password-${userId}`);

    const username = usernameElement.value;
    const password = passwordElement.value;

    const usernameError = form.querySelector(`#username-error-${userId}`);
    const passwordError = form.querySelector(`#password-error-${userId}`);

    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    let isValid = true;

    const usernameRegex = /^[\s\S]{3,}$/;
    if (!username || !usernameRegex.test(username)) {
      usernameError.textContent = 'إسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل';
      usernameError.style.display = 'block';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[ء-يa-z])(?=.*\d)[ء-يa-z\d]{6,}$/;
    if (password && !passwordRegex.test(password)) {
      passwordError.textContent = 'كلمة المرور يجب أن تحتوي على حرف ورقم وتحتوي على 6 أحرف على الأقل';
      passwordError.style.display = 'block';
      isValid = false;
    }else if(!password){
      passwordElement.removeAttribute('name');
    }

    if (isValid) form.submit();
  });
});

/**
 * Create user
 * Used to create user when submitting create user form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-user').addEventListener('click', (e) => {
  const form = document.querySelector('#create-user-form');
  const username = form.querySelector('#username').value;
  const password = form.querySelector('#password').value;

  const usernameError = form.querySelector('#username-error');
  const passwordError = form.querySelector('#password-error');

  usernameError.style.display = 'none';
  passwordError.style.display = 'none';

  let isValid = true;

  const usernameRegex = /^[\s\S]{3,}$/;
  if (!username || !usernameRegex.test(username)) {
    usernameError.textContent = 'إسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل';
    usernameError.style.display = 'block';
    isValid = false;
  }

  const passwordRegex = /^(?=.*[ء-يa-z])(?=.*\d)[ء-يa-z\d]{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    passwordError.textContent = 'كلمة المرور يجب أن تحتوي على حرف ورقم وتحتوي على 6 أحرف على الأقل';
    passwordError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
});

/* Toggle password visibility */
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', (e) => {
    const passwordElement = icon.previousElementSibling;
    if (passwordElement.getAttribute('type') === 'password') {
      passwordElement.setAttribute('type', 'text');
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      passwordElement.setAttribute('type', 'password');
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
});