module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verificationToken: DataTypes.STRING(16),
    isVerified: DataTypes.BOOLEAN
  }, {
    /*
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
    */
  });
  return User;
};
