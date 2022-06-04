const { Operation, User } = require('../models/models'); //Получаем таблицы из бд

class OperationController {
    //Метод класса по переводу средств пользователю
    async send(req, res) { 
        try {
            const { senderId, recipientNumber, sum } = req.body; //Из запроса получаем кто отправил, на какой номер отправили и сумму
            const sender = await User.findOne({ where: { id: senderId } })//Находим в базе данных пользователя, который делает перевод
            const recipient = await User.findOne({ where: { number: recipientNumber } }); //Находим пользователя, который получает перевод
            if (!recipient) {
                return res.json({ message: 'Такого отправителя нет' }); //Если получатель не найден, то возваращем оишбку
            }
            if (sender.balance - sum < 0) {
                return res.json({ message: 'У вас недостаточно средств' }); //Если перевод больше баланса пользователя, то возрвщаем пользователя
            }
            if (sum <= 0) {
                return res.json({ message: 'Введите сумму' }); //Если сумма не ведена возвраащем ошибку
            }
            const operationSend = await Operation.create({ //Создаем в бд запись операции для того, кто отправляет
                sum,
                message: 'Перевод',
                userId: senderId,
                consum: sum,
            });
            const operationRec = await Operation.create({ //Создаем в бд запись операции для того, кто получает
                sum,
                message: 'Получен перевод',
                userId: recipient.id,
                coming: sum,
            });
            await sender.update({ //У отправителя обновляем баланс
                balance: sender.balance - sum,
            });
            await recipient.update({ //У получателя обнволяем баланс
                balance: recipient.balance + sum,
            });
            return res.json({ message: 'Перевод успешно выполнен' }); //Возвращаем сообщение о том, что перевод успешно отправлен
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки какой то отправляяем на клиент ошибку
        }
    }

    //Метод класса по получению операций пользователя
    async getAll(req, res) {
        try {
            const { id } = req.params; //Получаем айди пользователя
            const operations = await Operation.findAll({ //Находим его операции
                where: { userId: id },
                order: [['date', 'DESC']],
            });
            return res.json(operations); //ОТправляем клиенту его операции
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки какой то отправляяем на клиент ошибку
        }
    }

    //Метод класса по получение суммы поступлений пользователя
    async comingBalance(req, res) {
        try {
            const { id } = req.params; //Получаем из запроса айди пользователя
            let sum = 0; //Создаем перменную для подсчета
            const operations = await Operation.findAll({ //Находим все операции у данного пользвоателя
                where: { userId: id },
            });
            operations.forEach((item) => { //Циклом прибавляем из каждой записи приходы
                sum += +item.coming;
            });
            return res.json(sum); //Возвращаем клиенту сумму поступлений
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки какой то отправляяем на клиент ошибку
        }
    }

     //Метод класса по получение суммы расходных операций пользователя
    async consumBalance(req, res) {
        try {
            const { id } = req.params; //Получаем из запроса айди пользователя
            let sum = 0; //Создаем перменную для подсчета
            const operations = await Operation.findAll({ //Находим все операции у данного пользвоателя
                where: { userId: id },
            });
            operations.forEach((item) => { //Циклом прибавляем из каждой записи приходы
                sum += +item.consum;
            });
            return res.json(-sum); //Возвращаем клиенту сумму поступлений
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки какой то отправляяем на клиент ошибку
        }
    }
}

module.exports = new OperationController();
