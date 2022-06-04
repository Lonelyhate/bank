import React, { useEffect, useState } from 'react';
import './ExtractPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getConsum, getReceip } from '../../redux/actions/info';
import { getOperations } from '../../redux/actions/operations';
import TopUp from '../../components/TopUp/TopUp';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader'

const ExtractPage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { consum, receip } = useSelector((state) => state.info);
    const { operations, loading } = useSelector((state) => state.operations);
    const [visableModal, setVisableModal] = useState(false);

    useEffect(() => {
        dispatch(getConsum(currentUser?.id));
        dispatch(getReceip(currentUser?.id));
        dispatch(getOperations(currentUser?.id));
    }, [currentUser?.balance]);

    return (
        <div className="extract">
            <div className="container">
                <h2 className="extract__title">Личный кабинет</h2>
                <h3 className="extract__vip">Выписка</h3>
                <div className="extract__top">
                    <h3 className="extract__fio">{currentUser?.fio}</h3>
                    <button onClick={(e) => setVisableModal(true)} className="extract__topup">
                        Пополнить счет
                    </button>
                </div>
                <div className="extract__top">
                    <div className="extract__left">
                        <h3 className="extract__subtitle">Мастер счет в рублях</h3>
                        <h4 className="extract__account">
                            Номер счета<span>{currentUser?.account_number} (RUR)</span>
                        </h4>
                        <h4 className="extract__balance">
                            Баланс<span>{currentUser?.balance} руб.</span>
                        </h4>
                    </div>
                    <Link className="extract__link" to="/transfer">
                        Платежи
                    </Link>
                </div>
                <h3 className="extract__info-title">Информация о счете</h3>
                <h4 className="extract__info-text">
                    Поступления <span>{receip} руб.</span>
                </h4>
                <h4 className="extract__info-text last">
                    Расходные операции<span>{consum} руб.</span>
                </h4>
                <h3 className="extract__info-title">Операции по счету/карте</h3>
                <div className="extract__header extract-header">
                    <h4 className="extract-header__title">
                        <span>Дата проведения операции</span>
                    </h4>
                    <h4 className="extract-header__title">
                        <span>Сумма операции в валюте операции</span>
                    </h4>
                    <div className="extract-header__sums">
                        <h4 className="extract-header__title">
                            <span>Сумма операции в валюте счета/карты</span>
                        </h4>
                        <div className="extract-header__info-money">
                            <span>Приход</span>
                            <span>Расход</span>
                        </div>
                    </div>
                    <h4 className="extract-header__title">
                        <span>Описание операции</span>
                    </h4>
                </div>
                <ul className="extract__list">
                    {!loading ? (
                        operations.length > 0 ? (
                            operations.map((item) => (
                                <li key={item.id} className="extract__item">
                                    <p className="extract__item-text">{item.date}</p>
                                    <p className="extract__item-text">{item.sum} руб.</p>
                                    <div className="extract__coming-consum">
                                        <p className="extract__item-text">{item.coming} руб.</p>
                                        <p className="extract__item-text">{item.consum} руб.</p>
                                    </div>
                                    <p className="extract__item-text">{item.message}</p>
                                </li>
                            ))
                        ) : (
                            <div className="extract__not">Операций еще не было</div>
                        )
                    ) : (
                        <div className="extract__loading">{<Loader />}</div>
                    )}
                </ul>
            </div>
            <TopUp id={currentUser?.id} visable={visableModal} setVisable={setVisableModal} />
        </div>
    );
};

export default ExtractPage;
