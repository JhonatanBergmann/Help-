import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import helpView from '../views/helps_view'
import * as Yup from 'yup'

import Help from '../models/Help'

export default {
  async index(request: Request, response: Response) {
    const helpsRepository = getRepository(Help)

    const helps = await helpsRepository.find({
      relations: ['images']
    })

    return response.json(helpView.renderMany(helps))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const helpsRepository = getRepository(Help)

    const help = await helpsRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return response.json(helpView.render(help))
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about
    } = request.body

    const helpsRepository = getRepository(Help)

    const requestImages = request.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const help = helpsRepository.create(data)

    await helpsRepository.save(help)

    return response.status(201).json(help)
  }
}