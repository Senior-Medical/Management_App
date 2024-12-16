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

// /**
//  * Get filter form data
//  * Used to get filter form data and convert it to a FormData object
//  * And apply some modifications to the data before sending it to the server
//  * 
//  * @param {Element} filterForm The filter form element
//  * @returns {FormData} The filter form data
//  */
// const getFilterFormData = (filterForm) => {
//   const filterFormData = new FormData(filterForm);
//   if (filterFormData.get('sort-type')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
//   filterFormData.delete('sort-type');
//   if (filterFormData.get('enable-custom-filter')) {
//     if (filterFormData.get('custom-filter-key') && filterFormData.get('custom-filter-value')) {
//       filterFormData.set(filterFormData.get('custom-filter-key'), filterFormData.get('custom-filter-value'));
//       filterFormData.delete('custom-filter-key');
//       filterFormData.delete('custom-filter-value');
//     }
//     filterFormData.delete('enable-custom-filter');
//   } else {
//     filterFormData.delete('custom-filter-key');
//     filterFormData.delete('custom-filter-value');
//   }
//   return filterFormData;
// }

// /**
//  * Filter users
//  * Used to filter users when submitting filter form
//  */
// document.querySelector('#filter-form').addEventListener('submit', function (e) {
//   e.preventDefault();
//   const filterForm = e.target;
//   const filterFormData = getFilterFormData(filterForm);

//   const url = `/users?${new URLSearchParams(filterFormData).toString()}`;
//   window.location.href = url;
// });

// /**
//  * Update page links with filter form data
//  * Used to filter users when changing pages using pagination and other filters in filter form
//  */
// document.querySelectorAll('.page-link').forEach(link => {
//   const filterForm = document.querySelector('#filter-form');
//   const filterFormData = getFilterFormData(filterForm);
//   const page = link.getAttribute('page');
//   const url = `/users?page=${page}&${new URLSearchParams(filterFormData).toString()}`;
//   link.setAttribute('href', url);
// });

// /**
//  * Enable/Disable custom filter input fields
//  * Used to enable/disable custom filter input fields when enabling/disabling custom filter checkbox
//  */
// document.querySelector('#enable-custom-filter').addEventListener('change', function (e) {
//   const customFilterKey = document.querySelector('#custom-filter-key');
//   const customFilterValue = document.querySelector('#custom-filter-value');
//   if (e.target.checked) {
//     customFilterKey.removeAttribute('disabled');
//     customFilterValue.removeAttribute('disabled');
//   } else {
//     customFilterKey.setAttribute('disabled', true);
//     customFilterValue.setAttribute('disabled', true);
//   }
// });

