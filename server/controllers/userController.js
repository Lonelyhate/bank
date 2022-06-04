const { User, Operation } = require('../models/models');//Получаем таблицы из бд
const bcrypt = require('bcrypt'); //получаем функию по хэшированию пароля
const jwt = require('jsonwebtoken'); //Получаем функию по работе с токенами

//Создаем функию для созданию токена
const generateJwt = (id, number, fio, account_number, balance) => {
    return jwt.sign({ id, number, fio, account_number, balance }, process.env.SECRET_KEY, {
        expiresIn: '30m',
    });
};

class UserController {
    //Метод класса регистрации пользователя
    async registration(req, res) {
        try {
            const { fio, number, password } = req.body; //Из запроса получаем ФИО, номер, пароль
            if (!number || !password) { //Если какие то поля не заданы
                return res.status(400).json({ message: 'Неккоректный номер или пароль' });
            }

            const candidate = await User.findOne({ where: { number } }); //провеляем есть ли такой пользователь в бд уже
            if (candidate) { //Если пользователь найден, то отправялем клиену о том, что такой номер уже зареган
                return res.status(400).json({ message: 'Такой номер уже есть' });
            }
            const hashPassword = await bcrypt.hash(password, 5); //Хэшируем пароль 
            const user = await User.create({ fio, number, password: hashPassword }); //Создаем пользователя в бд
            await user.update({ //Делаем пользовтелю уникальный номер счета
                account_number: user.account_number + user.id,
            });
            const token = generateJwt( //Создание токена пользователя
                user.id,
                user.number,
                user.fio,
                user.account_number,
                user.balance,
            );
            return res.json({ token }); //Отправляем токен на клиент
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' }); //В случае ошибки какой то отправляяем на клиент ошибку
        }
    }

    //Метод класса по входу в аккаунт
    async login(req, res) {
        const { number, password } = req.body; //Получаем номер и пароль из запроса
        const user = await User.findOne({ where: { number } }); //Поиск данного пользователя по номеру в бд
        if (!user) {
            return res.status(400).json({ message: 'Пользователя с таким номером нет' }); //Отправляем клиенту о том, что пользователя такого нет, если он не найден в бд
        }
        let comparePassword = bcrypt.compareSync(password, user.password); //Проверка паролей
        if (!comparePassword) {
            return res.status(400).json({ message: 'Неправильный пароль' }); //Если пароль неправильно введен
        }
        const token = generateJwt( //Создание токена
            user.id, 
            user.number,
            user.fio,
            user.account_number,
            user.balance,
        );
        return res.json({ token }); //Отправление на клиент токена
    }

    //Метод класса по проверки пользователя автризован ли он
    async check(req, res) {
        const user = await User.findOne({where: {id: req.user.id}}) //Находим пользователя в бд
        const token = generateJwt( //Создаем токен пользователя
            user.id,
            user.number,
            user.fio,
            user.account_number,
            user.balance,
        );
        return res.json({ token }); //Отправляем на клиент токен
    }

    //Пополение баланса пользователя
    async addBalance(req, res) {
        try {
            const { id, sum } = req.body; //Получаем из запроса айди пользователя и сумму пополнения
            const user = await User.findOne({ //Находим пользователя в бд
                where: { id },
            });
            await user.update({ //Добавляем сумму по пополение к балансу
                balance: +user.balance + +sum,
            });
            await Operation.create({ userId: id, sum, message: 'Пополнил счет', coming: sum }); //Создаем опрецию, что пользоаетль поплнил счет
            const token = generateJwt( //Создание токена пользователя с обновленным балансом
                user.id,
                user.number,
                user.fio,
                user.account_number,
                user.balance,
            );
            return res.json({ token }); //Отправляем новый токен на клиент
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });//В случае ошибки какой то отправляяем на клиент ошибку
        } 
    }
}

module.exports = new UserController();
