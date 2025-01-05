
// Show range value next to range input field
document.querySelectorAll("input[type='range']").forEach(range => {
  range.nextElementSibling.textContent = range.value + " %";
  range.addEventListener('input', function (e) {
    const rangeValue = e.target.value + " %";
    const rangeValueElement = e.target.nextElementSibling;
    rangeValueElement.textContent = rangeValue;
  });
});

// Set default date in all date inputs except update date inputs that already have default value
const inputDates = document.querySelectorAll('input[type="date"]:not(.update)');
inputDates.forEach(inputDate => {
  const today = new Date().toISOString().split('T')[0];
  inputDate.value = today;
  inputDate.max = today;
});

// Toggle password visibility
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