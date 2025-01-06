const PAGE_TYPE = document.body.getAttribute('data-page-type');

/**
 * Entity Form Validation
 * Used to validate entity form data before submitting it to the server
 * Used to vaidate forms of entities like departments, workers, and products that have the same structure (have only name field)
 * @param {string} formSelector The form selector to get the form element
 */
const EntityValidation = (formSelector) => {
  const form = document.querySelector(formSelector);
  const name = form.querySelector('input[name="name"]').value;
  const error = form.querySelector('.text-danger');
  error.style.display = 'none';

  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    error.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    error.style.display = 'block';
  } else form.submit();
};

/**
 * Users Form Validation
 * Used to validate user form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 * @param {boolean} isUpdate 
 */
const userValidation = (formSelector, isUpdate = false) => {
  const form = document.querySelector(formSelector);
  const username = form.querySelector('input[name="username"]').value;
  const password = form.querySelector('input[name="password"]').value;

  const usernameError = form.querySelector('.text-danger-username');
  const passwordError = form.querySelector('.text-danger-password');

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
  if (!isUpdate) {
    if (!password || !passwordRegex.test(password)) {
      passwordError.textContent = 'كلمة المرور يجب أن تحتوي على حرف ورقم وتحتوي على 6 أحرف على الأقل';
      passwordError.style.display = 'block';
      isValid = false;
    }
  } else {
    if (password && !passwordRegex.test(password)) {
      passwordError.textContent = 'يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل، وتحتوي على رقم واحد على الأقل، وحرف واحد على الأقل، وأن تتكون من أحرف وأرقام فقط.';
      passwordError.style.display = 'block';
      isValid = false;
    } else if (!password && isValid) {
      form.querySelector('input[name="password"]').removeAttribute('name');
    }
  }

  if (isValid) form.submit();
};

/**
 * Bonus form validation
 * Validate the bonus form data before submitting it to the server
 * @param {string} formSelector The form selector to get form data and validate it
 */
const bonusValidation = (formSelector) => {
  const form = document.querySelector(formSelector);
  const from = form.querySelector('input[name="from"]').value;
  const to = form.querySelector('input[name="to"]').value;
  const error = form.querySelector('.text-danger');
  error.style.display = 'none';
  if (parseInt(from) >= parseInt(to)) {
    error.innerText = 'الحد الأدنى يجب أن يكون أقل من الحد الأعلى';
    error.style.display = 'block';
  }
  else form.submit();
}

/**
 * Department form Validation
 * Validate the department form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const productionValidation = (formSelector) => {
  const form = document.querySelector(formSelector);

  const product = form.querySelector('select[name="product"]').value;
  const productError = form.querySelector('.text-danger-product');
  productError.style.display = 'none';

  const department = form.querySelector('select[name="department"').value;
  const departmentError = form.querySelector('.text-danger-department');
  departmentError.style.display = 'none';

  const worker = form.querySelector('select[name="worker"]').value;
  const workerError = form.querySelector('.text-danger-worker');
  workerError.style.display = 'none';

  const date = form.querySelector('input[name="date"]').value;
  const dateError = form.querySelector('.text-danger-date');
  dateError.style.display = 'none';

  const quantity = form.querySelector('input[name="quantity"]').value;
  const quantityError = form.querySelector('.text-danger-quantity');
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
}

/**
 * Product Price form Validation
 * Validate the product price form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const productPriceValidation = (formSelector) => {
  const form = document.querySelector(formSelector);

  const product = form.querySelector('select[name="product"]').value;
  const productError = form.querySelector('.text-danger-product');
  productError.style.display = 'none';

  const department = form.querySelector('select[name="department"').value;
  const departmentError = form.querySelector('.text-danger-department');
  departmentError.style.display = 'none';

  const price = form.querySelector('input[name="price"]').value;
  const priceError = form.querySelector('.text-danger-price');
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
};

/**
 * Salary form Validation
 * Validate the salary form data before submitting it to the server
 */
const salaryValidation = () => {
  const form = document.querySelector('#salary-form');

  const from = form.querySelector('input[name="from"]').value;
  const fromError = form.querySelector('.text-danger-from');
  fromError.style.display = 'none';

  const to = form.querySelector('input[name="to"]').value;
  const toError = form.querySelector('.text-danger-to');
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

  const fromObject = new Date(from);
  const toObject = new Date(to);
  if (fromObject >= toObject) {
    fromError.textContent = 'تاريخ البداية يجب أن يكون قبل تاريخ النهاية';
    fromError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
};

const ValidationMethods = {
  bonus: bonusValidation,
  workers: EntityValidation,
  products: EntityValidation,
  departments: EntityValidation,
  users: userValidation,
  production: productionValidation,
  productPrice: productPriceValidation,
}

// Create entity
document.querySelector(`.create-${PAGE_TYPE}`).addEventListener('click', (e) => {
  ValidationMethods[PAGE_TYPE](`#create-${PAGE_TYPE}-form`);
});

// Update entity
document.querySelectorAll(`.update-${PAGE_TYPE}`).forEach(button => {
  button.addEventListener('click', (e) => {
    const entityId = button.getAttribute('dataItemId');
    ValidationMethods[PAGE_TYPE](`#update-${PAGE_TYPE}-form-${entityId}`, true);
  });
});

// Validate get salary form
if(PAGE_TYPE === 'production') {
  document.querySelector('.salary').addEventListener('click', (e) => {
    salaryValidation();
  });
}