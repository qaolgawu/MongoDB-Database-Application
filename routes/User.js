const usersRouter = require('express').Router();
const auth = require('../middleware/auth')
const { getCurrentUser, updateProfile, createUser, login, logout, deleteUser, updateAvatar } = require('../controllers/User');

usersRouter.post('/signup', createUser);
usersRouter.get('/me', auth, getCurrentUser);
usersRouter.post('/signin', login);
usersRouter.patch('/me', auth, updateProfile);
usersRouter.patch('/avatar', auth, updateAvatar);
usersRouter.post('/signout', auth, logout);
usersRouter.delete('/me', auth, deleteUser);

module.exports = usersRouter;