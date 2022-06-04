import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';

const Header = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <h3 className="header__name">Банк</h3>
                    {!isAuth ? (
                        <Link to="/auth" className="header__auth">
                            Авторизация
                        </Link>
                    ) : (
                        <button onClick={logout} className="header__logout">
                            Выход
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
