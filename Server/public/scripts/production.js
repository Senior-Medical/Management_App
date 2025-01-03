const inputDates = document.querySelectorAll('input[type="date"]:not(.update)');
inputDates.forEach(inputDate => {
  const today = new Date().toISOString().split('T')[0];
  inputDate.value = today;
  inputDate.max = today;
});

/**
 * Create production
 * Used to create production when submitting create production form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-production').addEventListener('click', (e) => {
  const form = document.querySelector('#create-production-form');

  const product = form.querySelector('#product').value;
  const productError = form.querySelector('#product-error');
  productError.style.display = 'none';

  const department = form.querySelector('#department').value;
  const departmentError = form.querySelector('#department-error');
  departmentError.style.display = 'none';

  const worker = form.querySelector('#worker').value;
  const workerError = form.querySelector('#worker-error');
  workerError.style.display = 'none';

  const date = form.querySelector('#date').value;
  const dateError = form.querySelector('#date-error');
  dateError.style.display = 'none';

  const quantity = form.querySelector('#quantity').value;
  const quantityError = form.querySelector('#quantity-error');
  quantityError.style.display = 'none';

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

  if (!worker) {
    workerError.textContent = 'يجب إختيار العامل';
    workerError.style.display = 'block';
    isValid = false;
  }

  if (!quantity || isNaN(quantity)) {
    quantityError.textContent = 'يجب إدخال كمية الإنتاج';
    quantityError.style.display = 'block';
    isValid = false;
  }

  if (!date) {
    dateError.textContent = 'يجب إدخال تاريخ الإنتاج';
    dateError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
});

/**
 * Update production
 * Used to update production when submitting update production form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-production').forEach(button => {
  button.addEventListener('click', (e) => {
    const productionId = button.getAttribute('productionId');
    const form = document.querySelector(`#update-production-form-${productionId}`);
    
    const product = form.querySelector(`#product-${productionId}`).value;
    const productError = form.querySelector(`#product-error-${productionId}`);
    productError.style.display = 'none';

    const department = form.querySelector(`#department-${productionId}`).value;
    const departmentError = form.querySelector(`#department-error-${productionId}`);
    departmentError.style.display = 'none';

    const worker = form.querySelector(`#worker-${productionId}`).value;
    const workerError = form.querySelector(`#worker-error-${productionId}`);
    workerError.style.display = 'none';

    const quantity = form.querySelector(`#quantity-${productionId}`).value;
    const quantityError = form.querySelector(`#quantity-error-${productionId}`);
    quantityError.style.display = 'none';
    
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

    if (!worker) {
      workerError.textContent = 'يجب إختيار العامل';
      workerError.style.display = 'block';
      isValid = false;
    }

    if (!quantity || isNaN(quantity)) {
      quantityError.textContent = 'يجب إدخال كمية الإنتاج';
      quantityError.style.display = 'block';
      isValid = false;
    }

    if (isValid) form.submit();
  });
});


/**
 * Get Salary
 * Used to get salary when submitting salary form
 * Validate the form data before sending it to the server
 */
document.querySelector('#salary').addEventListener('click', (e) => {
  const form = document.querySelector('#salary-form');

  const from = form.querySelector('#from').value;
  const fromError = form.querySelector('#from-error');
  fromError.style.display = 'none';

  const to = form.querySelector('#to').value;
  const toError = form.querySelector('#to-error');
  toError.style.display = 'none';

  let isValid = true;

  if (!from) {
    fromError.textContent = 'يجب إدخال تاريخ البداية';
    fromError.style.display = 'block';
    isValid = false;
  }

  if (!to) {
    toError.textContent = 'يجب إدخال تاريخ النهاية';
    toError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
});