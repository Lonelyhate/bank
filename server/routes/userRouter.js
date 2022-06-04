const Router = require('express') //Поулчаем фреймворк
const router = new Router() //Занесенение класса в переменную для удобства
const userController = require('../controllers/userController') //Получаем класс по работе с пользователями
const authMiddleware = require('../middlewares/authMiddleware') //Получаем мидлвейр, который будет проверять авторизован ли пользователь

router.post('/registration', userController.registration) //Пост запрос с передачей метода класса для регистрации
router.post('/login', userController.login) //Пост запрос с передачей метода класса для входа в аккаунт
router.get('/auth', authMiddleware, userController.check) //Гет запрос с переданным мидлвером и методом класса по работе с проверкой авторизации пользователя
router.put('/add', userController.addBalance) //Пут запрос для пополнение баланса

module.exports = router