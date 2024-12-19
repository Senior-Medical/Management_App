/**
 * Create department
 * Used to create department when submitting create department form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-department').addEventListener('click', (e) => {
  const form = document.querySelector('#create-department-form');
  const name = form.querySelector('#name').value;
  const nameError = form.querySelector('#name-error');
  nameError.style.display = 'none';
  
  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'إسم القسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  } else form.submit();
});

/**
 * Update department
 * Used to update department when submitting update department form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-department').forEach(button => {
  button.addEventListener('click', (e) => {
    const departmentId = button.getAttribute('departmentId');
    const form = document.querySelector(`#update-department-form-${departmentId}`);
    const name = form.querySelector(`#name-${departmentId}`).value;
    const nameError = form.querySelector(`#name-error-${departmentId}`);
    nameError.style.display = 'none';
    
    const nameRegex = /^[\s\S]{3,}$/;
    if (!name || !nameRegex.test(name)) {
      nameError.textContent = 'إسم القسم يجب أن يحتوي على 3 أحرف على الأقل';
      nameError.style.display = 'block';
      isValid = false;
    } else form.submit();
  });
});

