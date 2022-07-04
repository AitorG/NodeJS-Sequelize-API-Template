module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class User extends Model {}

  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    password: DataTypes.STRING
  }, {
    sequelize: database,
    modelName: "user"
  })

  return User
}
