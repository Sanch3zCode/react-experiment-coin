const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const User = require('../models/user');
const Token = require('../models/token');
const { secret_access, secret_refresh } = require('../config');

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['authorization'];
    const refreshToken = req.cookies['refreshToken'];

    jwt.verify(accessToken, secret_access, (err, decoded) => {
        if (err) {
            jwt.verify(refreshToken, secret_refresh, async (err, decodedRefresh) => {
                if (err) {
                    return res.status(200).json({ 'error': 'invalid token' });
                }

                try {
                    const uToken = await Token.findOne({ refreshToken: refreshToken });
                    if (!uToken) {
                        return res.status(200).json({ 'error': 'invalid refresh token' });
                    }

                    const userByToken = await User.findOne({ _id: uToken.user });
                    if (!userByToken) {
                        return res.status(200).json({ 'error': 'user not found' });
                    }

                    const data = userController.createToken({ id: userByToken._id, login: userByToken.login });
                    await userController.saveToken(userByToken._id, data.refreshToken);

                    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                    res.cookie('authorization', data.accessToken, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
    
                    req.user = jwt.verify(data.accessToken, secret_access);
                    next();
                } catch (error) {
                    return res.status(500).json({ 'error': 'internal server error' });
                }
            });
        } else {
            req.user = decoded;
            next();
        }
    });
};

module.exports = verifyToken;
