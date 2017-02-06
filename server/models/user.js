module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verificationToken: DataTypes.STRING(16),
    isVerified: DataTypes.BOOLEAN,
    zipCode: DataTypes.STRING(6),
    taxRegistrationNumber: DataTypes.STRING(15),
    state: DataTypes.STRING(20),
    phoneNumber: DataTypes.STRING(12),
    identityNumber: DataTypes.STRING(16),
    dateOfBirth: DataTypes.DATEONLY,
    city: DataTypes.STRING,
    fullName: DataTypes.STRING,
    addressLine1: DataTypes.STRING
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


  /*
  addressLine1
  city
  dateOfBirth
  fullName
  identityNumber
  phoneNumber
  stateOption
  taxRegistrationNumber
  zipCode
  */