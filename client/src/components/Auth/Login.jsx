import axios from 'axios';
import { useState } from 'react';
import c from './Auth.module.css';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { ReactComponent as Back } from '../../assets/images/down-arrow-svgrepo-com.svg';

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    async function loginEvent() {
        const response = await axios.post('http://192.168.1.156:5000/api/users/login', {login: login, password: password});
        if (response.data.status === undefined) return alert(response.data.error);
        return navigate('/');
    }

    return (
        <div className={c.login}>
            <NavLink to='/'><Back width='30px' height='30px' fill="#fff" /></NavLink>
            <div className={c.center}>
                <h1 className={c.title}>Авторизация</h1>
                <Input placeholder='Введите логин' onChange={e => setLogin(e.target.value)} />
                <Input placeholder='Введите пароль' onChange={e => setPassword(e.target.value)} type='password' />
                <Button text='Войти' event={loginEvent} />
            </div>
        </div>
    )
}

export default Login;