import express from 'express'
import routeNotFound from './3-middlewares/route-not-found'
import catchAll from './3-middlewares/catch-all'
import appConfig from './2-utils/app-config'
import sanitize from './3-middlewares/sanitize'
import authController from './6-controllers/auth-controller'
import vacationsController from './6-controllers/vacation-controller'
import followersController from './6-controllers/followers-controller'
import expressFileUpLoad from 'express-fileupload'
import cors from 'cors'

const server = express()

server.use(cors({origin: appConfig.frontendURL}))

server.use(express.json())
server.use(sanitize)

server.use(expressFileUpLoad())

server.use("/api/auth", authController)
server.use("/api", vacationsController)
server.use("/api", followersController)
server.use("*", routeNotFound)
server.use(catchAll)
server.listen(appConfig.port, ()=>console.log(`Listen on port ${appConfig.port}`))