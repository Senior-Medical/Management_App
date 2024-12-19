/**
 * Create bonus
 * Used to create bonus when submitting create bonus form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-bonus').addEventListener('click', (e) => {
  const form = document.querySelector('#create-bonus-form');
  const from = form.querySelector('#from').value;
  const to = form.querySelector('#to').value;
  const percentage = form.querySelector('#percentage').value;

  const fromError = form.querySelector('#from-error');
  const toError = form.querySelector('#to-error');
  const percentageError = form.querySelector('#percentage-error');

  fromError.style.display = 'none';
  toError.style.display = 'none';
  percentageError.style.display = 'none';
  
  let isValid = true;

  if (!parseFloat(from)) {
    fromError.textContent = 'الرجاء إدخال الحد الأدنى للراتب';
    fromError.style.display = 'block';
    isValid = false;
  }
  if (!parseFloat(to)) {
    toError.textContent = 'الرجاء إدخال الحد الأعلى للراتب';
    toError.style.display = 'block';
    isValid = false;
  }
  if (!parseFloat(percentage)) {
    percentageError.textContent = 'الرجاء إدخال نسبة العلاوة';
    percentageError.style.display = 'block';
    isValid = false;
  }
  
  if (isValid) form.submit();
});

/**
 * Update bonus
 * Used to update bonus when submitting update bonus form
 * Validate the form data before sending it to the server
 */
document.querySelectorAll('.update-bonus').forEach(button => {
  button.addEventListener('click', (e) => {
    const bonusId = button.getAttribute('bonusId');
    const form = document.querySelector(`#update-bonus-form-${bonusId}`);

    const from = form.querySelector(`#from-${bonusId}`).value;
    const to = form.querySelector(`#to-${bonusId}`).value;
    const percentage = form.querySelector(`#percentage-${bonusId}`).value;

    const fromError = form.querySelector(`#from-error-${bonusId}`);
    const toError = form.querySelector(`#to-error-${bonusId}`);
    const percentageError = form.querySelector(`#percentage-error-${bonusId}`);

    fromError.style.display = 'none';
    toError.style.display = 'none';
    percentageError.style.display = 'none';
    
    let isValid = true;

    if (!parseFloat(from)) {
      fromError.textContent = 'الرجاء إدخال الحد الأدنى للراتب';
      fromError.style.display = 'block';
      isValid = false;
    }
    if (!parseFloat(to)) {
      toError.textContent = 'الرجاء إدخال الحد الأعلى للراتب';
      toError.style.display = 'block';
      isValid = false;
    }
    if (!parseFloat(percentage)) {
      percentageError.textContent = 'الرجاء إدخال نسبة العلاوة';
      percentageError.style.display = 'block';
      isValid = false;
    }
    if (isValid) form.submit();
  });
});

