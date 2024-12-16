/**
 * Create product
 * Used to create product when submitting create product form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-product').addEventListener('click', (e) => {
  const form = document.querySelector('#create-product-form');
  const name = form.querySelector('#name').value;
  const nameError = form.querySelector('#name-error');
  nameError.style.display = 'none';
  
  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'إسم العامل يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  } else form.submit();
});

/**
 * Update product
 * Used to update product when submitting update product form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-product').forEach(button => {
  button.addEventListener('click', (e) => {
    const productId = button.getAttribute('productId');
    const form = document.querySelector(`#update-product-form-${productId}`);
    const name = form.querySelector(`#name-${productId}`).value;
    const nameError = form.querySelector(`#name-error-${productId}`);
    nameError.style.display = 'none';
    
    const nameRegex = /^[\s\S]{3,}$/;
    if (!name || !nameRegex.test(name)) {
      nameError.textContent = 'إسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل';
      nameError.style.display = 'block';
      isValid = false;
    } else form.submit();
  });
});

