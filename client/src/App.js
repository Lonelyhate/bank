import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthPage from './pages/AuthPage/AuthPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './redux/actions/user';
import ExtractPage from './pages/ExtractPage/ExtractPage';
import TransferPage from './pages/Transfer/TransferPage'

function App() {
    const dispatch = useDispatch();
    const { isAuth, currentUser, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <div className="App">
            <Header />
            <Routes>
                {!isAuth ? (
                    <>
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/registration" element={<AuthPage />} />
                        <Route path="*" element={<Navigate replace to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/extract" element={<ExtractPage />} />
                        <Route path='/transfer' element={<TransferPage/>} />
                        <Route path="*" element={<Navigate replace to="/extract" />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
