/**
 * Get filter form data
 * Used to get filter form data and convert it to a FormData object
 * And apply some modifications to the data before sending it to the server
 * 
 * @param {Element} filterForm The filter form element
 * @returns {FormData} The filter form data
 */
const getFilterFormData = (filterForm) => {
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
  return filterFormData;
}

/**
 * Filter users
 * Used to filter users when submitting filter form
 */
document.querySelector('#filter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const filterForm = e.target;
  const filterFormData = getFilterFormData(filterForm);

  const url = `/users?${new URLSearchParams(filterFormData).toString()}`;
  window.location.href = url;
});

/**
 * Update page links with filter form data
 * Used to filter users when changing pages using pagination and other filters in filter form
 */
document.querySelectorAll('.page-link').forEach(link => {
  const filterForm = document.querySelector('#filter-form');
  const filterFormData = getFilterFormData(filterForm);
  const page = link.getAttribute('page');
  const url = `/users?page=${page}&${new URLSearchParams(filterFormData).toString()}`;
  link.setAttribute('href', url);
});

/**
 * Enable/Disable custom filter input fields
 * Used to enable/disable custom filter input fields when enabling/disabling custom filter checkbox
 */
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