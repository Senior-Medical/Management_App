function deleteUser(username) {
  fetch(`/users/${username}`, {
    method: 'DELETE'
  })
    .then(res => {
      console.log(res);
      if (res.status === 204) {
        window.location.reload();
      } else {
        alert('فشل حذف المستخدم');
      }
    })
    .catch(err => {
      console.error(err);
      alert('فشل حذف المستخدم');
    });
}

document.querySelectorAll('.delete-user').forEach(button => {
  button.addEventListener('click', (e) => deleteUser(button.getAttribute('username')));
});

document.querySelector('#add-user').addEventListener('click', (e) => {
  document.querySelector('#add-user-form').submit();
});