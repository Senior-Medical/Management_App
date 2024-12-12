document.querySelector('#filter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const filterForm = e.target;
  const filterFormData = new FormData(filterForm);
  if (filterFormData.get('sortType')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
  filterFormData.delete('sortType');
  const url = `/users?${new URLSearchParams(filterFormData).toString()}`;
  window.location.href = url;
});

document.querySelectorAll('.page-link').forEach(link => {
  const filterForm = document.querySelector('#filter-form');
  const filterFormData = new FormData(filterForm);
  const page = link.getAttribute('page');
  if (filterFormData.get('sortType')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
  filterFormData.delete('sortType');
  const url = `/users?page=${page}&${new URLSearchParams(filterFormData).toString()}`;
  link.setAttribute('href', url);
});