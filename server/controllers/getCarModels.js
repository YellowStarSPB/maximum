const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports = async function getCarModels(req, res) {
    const { mark = '' } = req.query;
    const findConfig = {};
    if (mark) {
        findConfig.mark = mark;
    }

    const client = new MongoClient(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const database = client.db(config.dbName);
        const collection = database.collection(config.collectionName);

        const models = await collection.distinct('model',findConfig);
        const filteredModels = models.filter(model => model && model.trim() !== '');
        res.status(200).json(filteredModels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};
