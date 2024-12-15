const filterForm = document.querySelector('#filter-form');

const getFilterFormData = (filterForm) => {
  const filterFormData = new FormData(filterForm);
  if (filterFormData.get('sort-type')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
  filterFormData.delete('sort-type');
  if (filterFormData.get('custom-filter-key') && filterFormData.get('custom-filter-value')) {
    filterFormData.set(filterFormData.get('custom-filter-key'), filterFormData.get('custom-filter-value'));
    filterFormData.delete('custom-filter-key');
    filterFormData.delete('custom-filter-value');
  }
  return filterFormData;
}

filterForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const filterForm = e.target;
  const filterFormData = getFilterFormData(filterForm);

  const url = `/users?${new URLSearchParams(filterFormData).toString()}`;
  window.location.href = url;
});

document.querySelectorAll('.page-link').forEach(link => {
  const filterForm = document.querySelector('#filter-form');
  const filterFormData = getFilterFormData(filterForm);
  const page = link.getAttribute('page');
  const url = `/users?page=${page}&${new URLSearchParams(filterFormData).toString()}`;
  link.setAttribute('href', url);
});

document.querySelector("#add-custom-filter").addEventListener('click', (e) => {
  filterForm.textContent += `

  `
})