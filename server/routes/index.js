const Router = require('express') //Поулчаем фреймворк
const router = new Router() //Занесенение класса в переменную для удобства
const user = require('./userRouter') //Получаем файл с путями по работе с пользователями
const operation = require('./operationRouter') //Получаем файл с путями по работе с операциями

router.use('/user', user) //Передаем в приложение путь и функцию
router.use('/operation', operation) //Передаем в приложение и фукнцию

module.exports = router