import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();
console.log("routess")
// Default path 
router.route('/')
    .get(userController.getAll)
    .post(userController.createUser)
    .delete(userController.deleteAll);

// Specific Path to make changes to an user providing id
router.route('/:userId')
    .get(userController.getById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default router;