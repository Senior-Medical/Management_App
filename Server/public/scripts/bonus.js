/**
 * Create bonus
 * Used to create bonus when submitting create bonus form
 * Validate the form data before sending it to the server
 */
document.querySelector('#create-bonus').addEventListener('click', (e) => {
  const form = document.querySelector('#create-bonus-form');
  form.submit();
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
    form.submit();
  });
});

