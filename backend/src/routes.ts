import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import HelpsController from './controllers/HelpsController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/helps', HelpsController.index)
routes.get('/helps/:id', HelpsController.show)
routes.post('/helps', upload.array('images'), HelpsController.create)

export default routes