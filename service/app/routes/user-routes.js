import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

router.route('/')
    .get(userController.getAll)
    .post(userController.createUser)
    .delete(userController.deleteAll);

router.route('/deleteAllPatients').delete(userController.deleteAllPatients);
router.route('/deleteAllDoctors').delete(userController.deleteAllDoctors);
router.route('/deleteAllLabs').delete(userController.deleteAllLabs);

router.route('/:userId')
    .get(userController.getById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default router;