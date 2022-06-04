import React, { useState } from 'react';
import './TopUp.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { userAddSum } from '../../redux/actions/user';
import { getOperations } from '../../redux/actions/operations';

const TopUp = ({ visable, setVisable, id }) => {
    const [sum, setSum] = useState('');
    const dispatch = useDispatch();

    const closeModal = () => {
        setVisable(false);
    };

    const addSumHandler = () => {
        closeModal();
        setSum('')
        dispatch(userAddSum(id, sum));
        dispatch(getOperations(id))
    };

    return (
        <div
            onClick={closeModal}
            className={cn('topup', {
                active: visable,
            })}>
            <div onClick={(e) => e.stopPropagation()} className="topup__content">
                <h3 className="topup__title">Пополнить счет на:</h3>
                <input
                    onChange={(e) => setSum(e.target.value)}
                    value={sum}
                    type="number"
                    className="topup__input"
                    placeholder="Введите сумму..."
                />
                <button onClick={addSumHandler} className="topup__btn">Пополнить</button>
            </div>
        </div>
    );
};

export default TopUp;
