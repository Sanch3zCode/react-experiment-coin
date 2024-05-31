import axios from 'axios';
import c from './Auth.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import { ReactComponent as Person } from '../../assets/images/person-svgrepo-com.svg';

const Auth = () => {
    const [login, setLogin] = useState('...');

    const logout = async () => {
        await axios.get('http://192.168.1.156:5000/api/users/logout')
        window.location.reload();
    };

    useEffect(() => {
        const getLogin = async () => {
            const response = await axios.get('http://192.168.1.156:5000/api/users');
            setLogin(response.data.login);
        };

        getLogin();
    }, [])

    return (
        <div className={c.auth}>
            <div className={c.center}>
                {login &&
                    <>
                        <div className={c.auth_info}>
                            <Person fill='#fff' width='20px' height='20px' />
                            <span>Выполнен вход как <b>{login}</b></span>
                        </div>
                        
                        <a href='/profile'>
                            <Button text='Профиль' />
                        </a>

                        <Button text='Выйти' event={logout} />
                    </>
                }

                <Link to='/register'>
                    <Button text="Зарегистрироваться" />
                </Link>

                <Link to='/login'>
                    <Button text="Войти"/>
                </Link>
            </div>
        </div>
    );
}

export default Auth; 