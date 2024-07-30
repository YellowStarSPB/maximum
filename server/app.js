// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
//controllers
const getCarCounts = require('./controllers/getCarCount');
const getCars = require('./controllers/getCars');
const getTotalPages = require('./controllers/getTotalPages');
const getCarModels = require('./controllers/getCarModels');
// Middleware для парсинга JSON тел запросов
app.use(express.json());
// Middleware для cors
app.use(cors());
// Маршрут для получения данных с пагинацией
app.get('/cars', getCars);
app.get('/models', getCarCounts);
app.get('/totalPages', getTotalPages);
app.get('/carModels', getCarModels);
// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
