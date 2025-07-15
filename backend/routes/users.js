const express = require('express');
const routerUsers = express.Router();
const { getProfile, getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const protectUsers = require('../middleware/authMiddleware');
const { onlyAdmin } = require('../middleware/roleMiddleware');

routerUsers.get('/profile', protectUsers, getProfile);
routerUsers.get('/', protectUsers, onlyAdmin, getUsers);
routerUsers.post('/', protectUsers, onlyAdmin, createUser);
routerUsers.put('/:id', protectUsers, onlyAdmin, updateUser);
routerUsers.delete('/:id', protectUsers, onlyAdmin, deleteUser);
module.exports = routerUsers;