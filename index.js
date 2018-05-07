const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const Sequelize = require('sequelize');

global.node_env = process.env.NODE_ENV;

const app = express();
const db = require('./db')(Sequelize);
const api = require('./controllers/api');
const tempDataToDb = require('./tempDataToDb.helper');

(async () => {
	await db.sequelize.sync({force: true});
	await tempDataToDb(db);

	app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('CWP-32 / Heroku deploy! There are some changes on main page');
    });

	app.use('/api', api(db));

	app.use((err, req, res, next) => res.status(err.status || 500).json(err.message));

	app.listen(process.env.PORT || config.app.port, () => {
		console.log('server listen port 3000');
	});
})();
