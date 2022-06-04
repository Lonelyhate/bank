require('dotenv').config() //Импорт для работы с глобальными переменными окружения
const express = require('express') //Импорт фреймворка по работе с http протоколом
const sequelize = require('./db') //orm для работы с базаыми данными
const models = require('./models/models') //Импорт таблиц из бд
const cors = require('cors') //Импорт для того, чтобы на сервер можно было отправлять запросы с бразуера
const router = require('./routes/index') //Импорт файла по работе с роутами(путями к серверу)

const PORT = process.env.PORT || 5001 //Порт сервера, process.env.PORT = глобальная переменная из файла .env
const app = express() //Занесение фреймоврка в переменную

//Передача нужных функций для работы с сервером
app.use(cors()) //Функция для того, чтобы сервер мог обрабатывать запросы с клиентской части приложения
app.use(express.json()) //Функция для того, чтобы сервер мог работать с json данными
app.use('/api', router) //Подключение роутов к серверу(путей)

//Класс для работы с сервером
class Server {
    async start() { //Метод класса по запуску сервера
        try {
            await sequelize.authenticate() //Подключение бд
            await sequelize.sync() //Подключение бд
            app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) //Запуск сервера
        } catch(e) {
            console.log(e) //В случае ошибки
        }
    }
}

new Server().start()