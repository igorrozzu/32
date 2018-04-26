const config = require('config');
const {commit, repo} = require('./models');

module.exports = (Sequelize) => {
    let dbConfig;
	switch (global.node_env) {
		case 'prod': dbConfig = config.dbProd; break;
		default: dbConfig = config.dbLoc;
	}

	const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, dbConfig.options);

	const Commit = commit(Sequelize, sequelize);
	const Repo = repo(Sequelize, sequelize);

	Repo.hasMany(Commit);

	return {
		Commit,
		Repo,
		sequelize,
		Sequelize
	};
};
