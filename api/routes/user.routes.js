module.exports = (express, checkToken, User) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      const response = await User.get(req.body)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  // método securizado
  router.post('/', checkToken, async (req, res, next) => {
    // Al pasar por checkToken, en req.user está el usuario decodificado del token
    try {
      const response = await User.create(req.user, req.body)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  return router
}
