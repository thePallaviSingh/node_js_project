const express = require('express');


const { getAllUser, addNewUser, getUserById, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();


router.route('/').get(getAllUser).post(addNewUser)
router.route('/:id').get(getUserById).delete(deleteUser).patch(updateUser)


module.exports = router;