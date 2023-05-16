import express from 'express'
import routeNotFound from './3-middlewares/route-not-found'
import catchAll from './3-middlewares/catch-all'
import appConfig from './2-utils/app-config'
import sanitize from './3-middlewares/sanitize'
import authController from './6-controllers/auth-controller'

const server = express()

server.use(express.json())
server.use(sanitize)

server.use("/api/auth", authController)
server.use("*", routeNotFound)
server.use(catchAll)
server.listen(appConfig.port, ()=>console.log(`Listen on port ${appConfig.port}`))