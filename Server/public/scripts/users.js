document.querySelectorAll('.update-user').forEach(button => {
  button.addEventListener('click', (e) => document.querySelector(`#update-user-form-${button.getAttribute('userId')}`).submit());
});

document.querySelector('#create-user').addEventListener('click', (e) => document.querySelector('#create-user-form').submit());