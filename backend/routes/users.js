const express = require('express');
const routerUsers = express.Router();
const { getProfile, getUsers, deleteUser } = require('../controllers/userController');
const protectUsers = require('../middleware/authMiddleware');
const { onlyAdmin } = require('../middleware/roleMiddleware');

routerUsers.get('/profile', protectUsers, getProfile);


routerUsers.get('/', protectUsers, onlyAdmin, getUsers);
routerUsers.delete('/:id', protectUsers, onlyAdmin, deleteUser);
module.exports = routerUsers;