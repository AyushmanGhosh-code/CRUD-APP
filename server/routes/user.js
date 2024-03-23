const express = require('express');
const router = express.Router();

const {createUser,getUsers,updateUser,deleteUser} = require('../controllers/crud');

router.post('/createUser',createUser);
router.get('/getUser',getUsers);
router.put('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser);

module.exports = router;