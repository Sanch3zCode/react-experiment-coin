const User = require('../models/user');
const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');
const bcrypt = require('bcrypt');
const { secret_access, secret_refresh } = require('../config');

class UserController {
    createToken(user) {
        const payload = { id: user.id, login: user.login };
        const accessToken = jwt.sign(
            payload, secret_access, { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign(
            payload, secret_refresh, { expiresIn: '30d' }
        );

        return { accessToken, refreshToken };
    }

    async saveToken(uid, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: uid });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({user: uid, refreshToken});
        return token;
    }

    async logout(req, res) {
        res.clearCookie('authorization');
        res.clearCookie('refreshToken');
        res.status(200).json({'status': 'ok'});
    }

    async register(req, res) {
        const { login, password } = req.body
        
        if (!login || !password) {
            res.status(200).json({'error': 'missing data'});
            return;
        }

        await User.findOne({ login: login })
        .then(async u => {
            if (u) return res.status(200).json({'error': 'already exists'});

            const passwordHash = await bcrypt.hash(password, 10);
            const generateRandomString = () => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let randomAddress = '0x';
                
                for (let i = 0; i < 40; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    randomAddress += characters[randomIndex];
                }
            
                return randomAddress;
            }

            const user = new User({
                login: login,
                password: passwordHash,
                address: generateRandomString(),
                amount: 0
            });
        
            await user.save();

            const tokens = this.createToken(user);
            await this.saveToken(user._id, tokens.refreshToken);
            
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
            res.cookie('authorization', tokens.accessToken, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({'status': 'ok'});
        });
    }

    async login(req, res) {
        const { login, password } = req.body;

        if (!login || !password) return res.status(200).json({'error': 'missing data'});

        const user = await User.findOne({ login: login });
        if (!user) return res.status(200).json({'error': 'unknown user'});

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(200).json({'error': 'incorrect password'});

        const tokens = this.createToken(user);
        await this.saveToken(user._id, tokens.refreshToken);
        
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
        res.cookie('authorization', tokens.accessToken, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
        res.status(200).json({'status': 'ok'});
    }

    async getInfo(req, res) {
        const data = await User.findOne({ _id: req.user.id });
        if (!data) return {'error': 'unathorized'};

        return {
            id: req.user.id,
            login: req.user.login,
            address: data.address,
            amount: data.amount,
            transactions: data.transactions
        };
    }
}

module.exports = new UserController();