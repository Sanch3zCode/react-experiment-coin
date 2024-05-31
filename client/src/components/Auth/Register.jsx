import axios from 'axios';
import c from './Auth.module.css';
import { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { ReactComponent as Back } from '../../assets/images/down-arrow-svgrepo-com.svg';

const Register = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRepeatPassword] = useState('');

    async function regEvent() {
        if (password !== rPassword) return alert('Passwords do not match'); 
        
        const response = await axios.post('http://192.168.1.156:5000/api/users/reg', {login: login, password: password});
        if (response.data.status === undefined) return alert(response.data.error);
        return navigate('/');
    }

    return (
        <div className={c.register}>
            <NavLink to='/'><Back width='30px' height='30px' fill="#fff" /></NavLink>
            <div className={c.center}>
                <h1 className={c.title}>Регистрация</h1>
                <Input placeholder='Введите логин' onChange={e => setLogin(e.target.value)} />
                <Input placeholder='Введите пароль' onChange={e => setPassword(e.target.value)} type='password' />
                <Input placeholder='Повторите пароль' onChange={e => setRepeatPassword(e.target.value)} type='password' />
                <Button text='Зарегистрироваться' event={regEvent} />
            </div>
        </div>
    )
}

export default Register;