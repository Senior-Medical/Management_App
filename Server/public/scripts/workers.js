/**
 * Create worker
 * Used to create worker when submitting create worker form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-worker').addEventListener('click', (e) => {
  const form = document.querySelector('#create-worker-form');
  const name = form.querySelector('#name').value;
  const nameError = form.querySelector('#name-error');
  nameError.style.display = 'none';
  
  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'إسم العامل يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
  } else form.submit();
});

/**
 * Update worker
 * Used to update worker when submitting update worker form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-worker').forEach(button => {
  button.addEventListener('click', (e) => {
    const workerId = button.getAttribute('workerId');
    const form = document.querySelector(`#update-worker-form-${workerId}`);
    const name = form.querySelector(`#name-${workerId}`).value;
    const nameError = form.querySelector(`#name-error-${workerId}`);
    nameError.style.display = 'none';
    
    const nameRegex = /^[\s\S]{3,}$/;
    if (!name || !nameRegex.test(name)) {
      nameError.textContent = 'إسم العامل يجب أن يحتوي على 3 أحرف على الأقل';
      nameError.style.display = 'block';
    } else form.submit();
  });
});

