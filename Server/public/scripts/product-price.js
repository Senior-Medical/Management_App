/**
 * Create product-price
 * Used to create product-price when submitting create product-price form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-product-price').addEventListener('click', (e) => {
  const form = document.querySelector('#create-product-price-form');

  const product = form.querySelector('#product').value;
  const productError = form.querySelector('#product-error');
  productError.style.display = 'none';

  const department = form.querySelector('#department').value;
  const departmentError = form.querySelector('#department-error');
  departmentError.style.display = 'none';

  const price = form.querySelector('#price').value;
  const priceError = form.querySelector('#price-error');
  priceError.style.display = 'none';

  let isValid = true;

  if(!product) {
    productError.textContent = 'يجب إختيار المنتج';
    productError.style.display = 'block';
    isValid = false;
  }

  if (!department) {
    departmentError.textContent = 'يجب إختيار القسم';
    departmentError.style.display = 'block';
    isValid = false;
  }

  if (!price || isNaN(price)) {
    priceError.textContent = 'يجب إدخال السعر';
    priceError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
});

/**
 * Update product-price
 * Used to update product-price when submitting update product-price form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-product-price').forEach(button => {
  button.addEventListener('click', (e) => {
    const productPriceId = button.getAttribute('productPriceId');
    const form = document.querySelector(`#update-product-price-form-${productPriceId}`);
    
    const product = form.querySelector(`#product-${productPriceId}`).value;
    const productError = form.querySelector(`#product-error-${productPriceId}`);
    productError.style.display = 'none';

    const department = form.querySelector(`#department-${productPriceId}`).value;
    const departmentError = form.querySelector(`#department-error-${productPriceId}`);
    departmentError.style.display = 'none';

    const price = form.querySelector(`#price-${productPriceId}`).value;
    const priceError = form.querySelector(`#price-error-${productPriceId}`);
    priceError.style.display = 'none';
    
    let isValid = true;

    if(!product) {
      productError.textContent = 'يجب إختيار المنتج';
      productError.style.display = 'block';
      isValid = false;
    }

    if (!department) {
      departmentError.textContent = 'يجب إختيار القسم';
      departmentError.style.display = 'block';
      isValid = false;
    }

    if (!price || isNaN(price)) {
      priceError.textContent = 'يجب إدخال السعر';
      priceError.style.display = 'block';
      isValid = false;
    }

    if (isValid) form.submit();
  });
});

