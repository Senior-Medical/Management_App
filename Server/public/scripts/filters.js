/**
 * Get filter form data
 * Used to get filter form data and convert it to a FormData object
 * And apply some modifications to the data before sending it to the server
 * 
 * @param {Element} filterForm The filter form element
 * @returns {string} The filter form url
 */
const getFilterUrl = (filterForm) => {
  for (const element of filterForm.elements) {
    if (element.value) {
      if (element.getAttribute('type') === 'text') element.value = `search:` + element.value;
      if ((element.getAttribute('type') === 'number' && element.getAttribute('name') !== 'pageSize') || element.getAttribute('type') === 'range') {
        element.setAttribute('type', 'text');
        element.value = `${element.previousElementSibling.value}${element.value}`;
      }
    } else {
      element.removeAttribute("name");
    }
  }

  const filterFormData = new FormData(filterForm);
  if (filterFormData.get('sort-type')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
  filterFormData.delete('sort-type');

  const action = filterForm.getAttribute('action');
  return `${action}?${new URLSearchParams(filterFormData).toString()}`;
}

// Used to filter data when submitting filter form
document.querySelector('#filter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  window.location.href = getFilterUrl(e.target);
});

// Update page links href attribute and add filter form data to it
// Used to apply filter form data with pagination links
document.querySelectorAll('.page-link').forEach(link => {
  link.setAttribute('href', `${getFilterUrl(document.querySelector('#filter-form'))}&page=${link.getAttribute('page')}`);
});