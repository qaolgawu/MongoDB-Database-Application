import { api } from "./api.js";

const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.form__inp')
const submit = document.querySelector('.form .form__submit')

async function submitForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const obj = {};
    const elements = [...form.elements].filter(el => !el.type || el.type !== 'submit');
    elements.forEach(el => obj[el.name] = el.value);
    const data = await api.sign(form.getAttribute('data-url'), form.getAttribute('data-method'), obj);
    console.log(data);
    if(data.token){
        localStorage.setItem('token', (data.token))
    }
    form.reset()
    window.location.href = '/page/'
}

function validation(inp){
    const errMsg = inp.nextElementSibling
    if(inp.validity.patternMismatch){
        errMsg.textContent = inp.getAttribute('data-error-pattern')
    } else if (inp.validity.valueMissing){
        errMsg.textContent = 'Поле не должно быть пустым'
    } else if(inp.validity.tooLong || inp.validity.tooShort){
        errMsg.textContent = inp.getAttribute('data-error-length')
    }
    else {
        errMsg.textContent = ''
    }
    submit.disabled = !Array.from(inputs).every((inp)=> inp.validity.valid)
}


inputs.forEach(inp => inp.addEventListener('input', () => validation(inp)))
form.addEventListener('submit', submitForm)