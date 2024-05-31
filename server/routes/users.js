const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/userController');
const transactionsController = require('../controllers/transactionsController');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    res.status(200).json(await userController.getInfo(req, res));
});

router.post('/', async (req, res) => {
    await transactionsController.createTransaction(req.body);
    res.status(200).json({'status': 'ok'});
})

router.get('/logout', async (req, res) => await userController.logout(req, res));

router.post('/login', async (req, res) => await userController.login(req, res));

router.post('/reg', async (req, res) => await userController.register(req, res));

module.exports = router;