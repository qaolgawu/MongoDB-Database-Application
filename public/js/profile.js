import { user } from "./user.js";
import auth from "./auth.js";
import {api} from "./api.js";

const authLinks = document.querySelectorAll('.authEvent');
const profile = document.querySelector('.profile');
const name = document.querySelector('.name');
const email = document.querySelector('.email');
const avatar = document.querySelector('.avatar');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form');

const edit = document.querySelector('.edit');
const exit = document.querySelector('.exit');
const deleteBtn = document.querySelector('.delete');

function initAuth() {
    return auth().then(() => {
        authLinks.forEach(link => link.classList.add('hidden'));
        profile.classList.remove('hidden');
        name.textContent = user.name;
        email.textContent = user.email;
        avatar.src = user.avatar || '/img/profile.webp';
    }).catch(err => {
        profile.classList.add('hidden');
        authLinks.forEach(link => link.classList.remove('hidden'));
    })
}

async function submitForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const obj = {};
    const elements = [...form.elements].filter(el => !el.type || el.type !== 'submit');
    elements.forEach(el => obj[el.name] = el.value);
    const data = await api.update(form.getAttribute('data-url'), form.getAttribute('data-method'), obj);
    await initAuth()
    user.setUser(data);
    overlay.classList.add('hiddenOverlay');
    form.reset();
}

overlay.addEventListener('click', (e) => {
    if(e.target === overlay) {
        overlay.classList.add('hiddenOverlay');
    }
})
edit.addEventListener('click', () => {
    overlay.classList.remove('hiddenOverlay');
    overlay.querySelector('[name="name"]').value = user.name;
    overlay.querySelector('[name="email"]').value = user.email;
})

exit.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.href = '/page/'
})

deleteBtn.addEventListener('click', async () => {
    await api.delete();
    localStorage.removeItem('token');
    location.href = '/page/'
})

form.addEventListener('submit', submitForm)
initAuth()