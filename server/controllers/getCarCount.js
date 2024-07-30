const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports = async function getCarCounts(req, res) {
    const client = new MongoClient(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const database = client.db(config.dbName);
        const collection = database.collection(config.collectionName);

        // Агрегационный запрос для подсчета количества автомобилей каждой марки
        const results = await collection
            .aggregate([
                {
                    $group: {
                        _id: '$mark', // Группировка по полю 'mark'
                        count: { $sum: 1 }, // Подсчет количества автомобилей в каждой группе
                    },
                },
                {
                    $sort: { count: -1 }, // Сортировка результатов по убыванию количества
                },
                {
                    $project: {
                        _id: 0, // Исключаем поле _id
                        mark: '$_id', // Создаем поле 'mark' из '_id'
                        count: 1, // Оставляем поле 'count' в результатах
                    },
                },
            ])
            .toArray();

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json('что-то пошло не так');
    } finally {
        await client.close();
    }
};
