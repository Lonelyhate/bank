import React, { useState } from 'react';
import './TransferPage.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations, sendMoney } from '../../redux/actions/operations';
import Loader from '../../components/Loader/Loader'
import { auth } from '../../redux/actions/user';

const TransferPage = () => {
    const [number, setNumber] = useState('');
    const [sum, setSum] = useState('');
    const { currentUser } = useSelector((state) => state.user);
    const {message, loading} = useSelector(state => state.operations)
    const dispatch = useDispatch()
    const [visableMessage, setVisableMessage] = useState(false)

    const sendHandler = async () => {
        await dispatch(sendMoney(currentUser.id, number, sum))
        await dispatch(getOperations(currentUser.id))
        await dispatch(auth())
        setNumber('')
        setSum('')
        setVisableMessage(true)
        setTimeout(() => {
            setVisableMessage(false)
        }, 2000)
    }

    return (
        <div className="transfer">
            <div className="container">
                <Link className="transfer__back" to="/extract">
                    Назад
                </Link>
                <h2 className="transfer__title">Платежи</h2>
                <div className="transfer__content">
                    <h3 className="transfer__subtitle">Сделать перевод</h3>
                    <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        type="text"
                        className="transfer__input"
                        placeholder="Введите номер получателя..."
                    />
                    <input
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                        type="number"
                        className="transfer__input"
                        placeholder="Введите сумму для перевода..."
                    />
                    <button onClick={sendHandler} className="transfer__btn">
                        <span>Отправить</span>
                    </button>
                    {loading && <Loader/>}
                    {message.length > 0 && !loading && visableMessage && <div className='transfer__message'>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default TransferPage;
