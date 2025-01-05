document.querySelector('#enable-custom-filter').addEventListener('change', function (e) {
  const customFilterKey = document.querySelector('#custom-filter-key');
  const customFilterValue = document.querySelector('#custom-filter-value');
  if (e.target.checked) {
    customFilterKey.removeAttribute('disabled');
    customFilterValue.removeAttribute('disabled');
  } else {
    customFilterKey.setAttribute('disabled', true);
    customFilterValue.setAttribute('disabled', true);
  }
});

/**
 * Get filter form data
 * Used to get filter form data and convert it to a FormData object
 * And apply some modifications to the data before sending it to the server
 * 
 * @param {Element} filterForm The filter form element
 * @returns {string} The filter form url
 */
const getFilterUrl = (filterForm) => {
  const filterFormData = new FormData(filterForm);
  if (filterFormData.get('sort-type')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
  filterFormData.delete('sort-type');
  if (filterFormData.get('enable-custom-filter')) {
    if (filterFormData.get('custom-filter-key') && filterFormData.get('custom-filter-value')) {
      filterFormData.set(filterFormData.get('custom-filter-key'), filterFormData.get('custom-filter-value'));
      filterFormData.delete('custom-filter-key');
      filterFormData.delete('custom-filter-value');
    }
    filterFormData.delete('enable-custom-filter');
  } else {
    filterFormData.delete('custom-filter-key');
    filterFormData.delete('custom-filter-value');
  }

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