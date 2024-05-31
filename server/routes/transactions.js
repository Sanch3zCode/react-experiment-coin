const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middlewares/verifyToken');
const transactionsController = require('../controllers/transactionsController');

router.post('/transfer', verifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    const transfer = await transactionsController.transfer({from: user.address, to: req.body.to, total: req.body.total});
    res.status(200).json({'msg': transfer});
});

module.exports = router;