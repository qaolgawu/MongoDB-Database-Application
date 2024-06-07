import auth from "./auth.js";

const authLinks = document.querySelectorAll('.authEvent');
const profile = document.querySelector('.profile');

auth().then(() => {
    authLinks.forEach(link => link.classList.add('hidden'));
    profile.classList.remove('hidden');
}).catch(err => {
    console.log(err);
    profile.classList.add('hidden');
    authLinks.forEach(link => link.classList.remove('hidden'));
})




