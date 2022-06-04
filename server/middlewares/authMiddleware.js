const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; //Получаем токен из запроса
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' }); //В случае если токена нет в запросе , то пользователь не авторизован
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY); //Декадируем токен в обычные данные
        req.user = decoded; //Передаем в запрос данные с пользователем
        next();
    } catch (e) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};
