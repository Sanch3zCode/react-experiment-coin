import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<Auth />} />
                    <Route path='/profile' element={<Profile />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
