const pageRouter = require('express').Router();

pageRouter.get('/', (req, res, next) => {
    res.render('index', {body: '', title: 'Главная'})
})


pageRouter.get('/signin', (req, res, next) => {
    res.render('signIn', {body: '', title: 'Авторизация'})
})


pageRouter.get('/signup', (req, res, next) => {
    res.render('signUp', {body: '', title: 'Регистрация'})
})


pageRouter.get('/profile', (req, res, next) => {
    res.render('profile', {body: '', title: 'Профиль'})
})


module.exports= pageRouter