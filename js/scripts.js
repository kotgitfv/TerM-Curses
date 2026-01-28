window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 40) {
        header.classList.add('active__header');
    } else {
        header.classList.remove('active__header');
    }
});


let users = [];

const form = document.querySelector('.registration .form');
const usersTableBody = document.querySelector('#usersTable tbody');

function renderUsers() {
  usersTableBody.innerHTML = '';

  users.forEach((user, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.course}</td>
      <td><button class="delete-btn" data-index="${index}">❌</button></td>
    `;
    usersTableBody.appendChild(tr);

    setTimeout(() => {
      tr.classList.add('show');
    }, 10);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      const tr = e.target.closest('tr');
      tr.classList.add('remove');

      setTimeout(() => {
        users.splice(idx, 1);
        renderUsers();
      }, 300);
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const courseSelect = form.querySelector('select[name="direction"]');
  const course = courseSelect.value;

  if (!name || !email || !course) {
    alert('Пожалуйста, заполните все поля и выберите курс.');
    return;
  }

  users.push({ name, email, course });
  renderUsers();
  form.reset();
});

const burger = document.getElementById('burger-menu');
const menu = document.querySelector('.header__links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});
