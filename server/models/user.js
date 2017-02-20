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
    addressLine1: DataTypes.STRING,
    bank: DataTypes.STRING(50),
    bankBranch: DataTypes.STRING(100),
    bankAccountNumber: DataTypes.STRING(8),
    bankAccountName: DataTypes.STRING(100),
    employmentStatus: DataTypes.STRING(50),
    employer: DataTypes.STRING(50),
    employerAddress: DataTypes.STRING(100),
    employerPhoneNumber: DataTypes.STRING(20),
    householdIncome: DataTypes.STRING,
    yearEmployment: DataTypes.INTEGER(4),
    religion: DataTypes.STRING(20),
    relationship: DataTypes.STRING(20),
    education: DataTypes.STRING(20),
    citizenship: DataTypes.STRING(50),
    motherName: DataTypes.STRING(50),
    emergencyContactName: DataTypes.STRING(50),
    emergencyContactNumber:DataTypes.STRING(20),
    relationshipWithRHB: DataTypes.BOOLEAN,
    relationshipWithRHBExtension: DataTypes.STRING,
    memberOfFinancialCompany: DataTypes.BOOLEAN,
    memberOfFinancialCompanyExtension: DataTypes.STRING,
    memberOfPublicCorporation: DataTypes.BOOLEAN,
    memberOfPublicCorporationExtension: DataTypes.STRING,
    fileKey: DataTypes.STRING,
    docusignStatus: DataTypes.STRING
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
