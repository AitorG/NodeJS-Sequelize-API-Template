const encrypter = require('./../auth/encriptString')

module.exports = (UserModel) => {
  class User {
    async get() {
      try {
        const users = await UserModel.findAll()
        return users
      } catch (e) {
        throw e
      }
    }

    async create(tokenUser, user) {
      try {
        if (!user || !user.username || !user.password) {
          throw new Error('Parámetros incorrectos')
        }
        if (tokenUser.rol != 'admin') { // por ejemplo ¯\_(ツ)_/¯
          throw new Error('No tienes permisos para realizar esta acción')
        }
        const password = await encrypter(user.password)
        const dbUser = await UserModel.create({
          username: user.username,
          name: user.name,
          birthday: new Date(1992, 5, 15),
          password: password,
          createdAt: new Date()
        })
        return dbUser
      } catch (e) {
        throw e
      }
    }
  }

  return new User()
}
