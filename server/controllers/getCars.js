const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports = async function getCars(req, res) {
    const { page, limit, mark = '',models='' } = req.query;
    const findConfig = {};
    if (mark) {
        findConfig.mark = mark;
    }
    if(models){
        const modelArray = models.split(',').map(model => model.trim());
        findConfig.model = { $in: modelArray };
    }
    console.log(findConfig)
    const client = new MongoClient(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const database = client.db(config.dbName);
        const collection = database.collection(config.collectionName);

        const skip = (page - 1) * limit;
        const results = await collection
            .find(findConfig)
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};
