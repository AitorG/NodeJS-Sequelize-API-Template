module.exports = (express, checkToken, Auth) => {
  const router = express.Router()

  router.post('/', async (req, res, next) => {
    try {
      const response = await Auth.getToken(req.body)
      res.json(response)
    } catch(e) {
      next(e)
    }
  })

  return router
}
