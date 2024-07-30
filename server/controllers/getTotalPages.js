const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports = async function getTotalPages(req, res) {
    const { mark, limit = 20,models='' } = req.query;
    const findConfig = {};
    if (mark) {
        findConfig.mark = mark;
    }
    if(models){
        const modelArray = models.split(',').map(model => model.trim());
        findConfig.model = { $in: modelArray };
    }
    const client = new MongoClient(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        const database = client.db(config.dbName);
        const collection = database.collection(config.collectionName);

        // Подсчет общего количества машин для заданной марки
        const total = await collection.countDocuments(findConfig);

        // Рассчитываем общее количество страниц
        const totalPages = Math.ceil(total / parseInt(limit));
        res.status(200).json({ totalPages });
    } catch (error) {
        console.error('Error fetching total pages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};
