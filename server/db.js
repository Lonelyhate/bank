const {Sequelize} = require('sequelize')

//Настройка бд
module.exports = new Sequelize(
    process.env.DB_NAME, //Название бд
    process.env.DB_USER, //Пользователь
    process.env.DB_PASSWORD, //Пароль
    {
        dialect: 'postgres', //Выбранное бд
        host: process.env.DB_HOST, //Хост сервера
        port: process.env.DB_PORT, //Порт сервера
        define: {
            timestamps: false
        }
    }
)