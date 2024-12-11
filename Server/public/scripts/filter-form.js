document.querySelector('#filter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  if (data.get('sortType')) data.set('sort', `-${data.get('sort')}`);
  data.delete('sortType');
  const url = new URL(form.action);
  for (const [key, value] of data) {
    url.searchParams.append(key, value);
  }
  window.location.href = url;
});