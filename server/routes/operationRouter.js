const Router = require('express') //Поулчаем фреймворк
const router = new Router() //Занесенение класса в переменную для удобства
const operationController = require('../controllers/operationController') //Получаем класс по работе с операциями

router.post('/', operationController.send) //Пост запрос с методом класса по переводу денег между пользователями
router.get('/:id', operationController.getAll) //Гет запрос с передачей метода класса по получению оперция на определнного пользвоателя
router.get('/coming/:id', operationController.comingBalance) //Гет запрос по получению средств на баланс
router.get('/consum/:id', operationController.consumBalance) //Гет запрос по расходам

module.exports = router