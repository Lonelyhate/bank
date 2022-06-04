import React, { useState } from 'react';
import './AuthPage.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegistration } from '../../redux/actions/user.js';

const AuthPage = () => {
    const {error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [visableMessage, setVisableMessage] = useState(false)
    const [fio, setFio] = useState('');
    let login = location.pathname === '/login' ? true : false;

    const btnTo = () => {
        navigate(login ? '/registration' : '/login');
        setVisableMessage(false)
    };

    const loginHandler = () => {
        if (login) {
            dispatch(userLogin(number, password))
        } else {
            dispatch(userRegistration(fio, number, password));
        }
        setVisableMessage(true)
    };

    

    return (
        <div className="auth-page">
            <h2 className="auth-page__title">Авторизация</h2>
            <div className="auth-page__content">
                <h3 className="auth-page__subtitle">{login ? 'Войти в акканут' : 'Регистрация'}</h3>
                <input
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    type="text"
                    className="auth-page__input"
                    placeholder="Введите номер..."
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="auth-page__input"
                    placeholder="Введите пароль..."
                />
                {!login && (
                    <input
                        onChange={(e) => setFio(e.target.value)}
                        value={fio}
                        type="text"
                        className="auth-page__input"
                        placeholder="Введите ФИО..."
                    />
                )}
                <button onClick={loginHandler} className="auth-page__login">
                    <span>{login ? 'Войти' : 'Зарегистрироваться'}</span>
                </button>
                {error && visableMessage && error != 'Пользователь не авторизован' && <div className='auth-page__error'>{error}</div>}
                <h3 className="auth-page__subtitle">{login ? 'Нет аккаунта?' : 'Есть аккаунт?'}</h3>
                <button onClick={btnTo} className="auth-page__btn">
                    <span>{login ? 'Зарегистрироваться' : 'Войти'}</span>
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
