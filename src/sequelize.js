const Sequelize = require('sequelize');

module.exports = function () {
  const app = this;
  //const connectionString = 'mysql://root:examplepassword@mysql:3306/database_ifgf_development';
  const connectionString = 'mysql://techadmin:d3vTEAM2018!@ifgfseattle-test.cjzulmygqqiw.us-east-2.rds.amazonaws.com:3306/ifgfseattle_test';
  const sequelize = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
};
