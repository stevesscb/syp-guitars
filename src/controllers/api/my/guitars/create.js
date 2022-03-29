/* eslint-disable linebreak-style */
import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import uploadFileAsync from '../../../_helpers/upload-file.js'

const createSchema = yup.object({
  type: yup.string().required(),
  make: yup.string(),
  model: yup.string(),
  year: yup.number(),
  price: yup.number().min(0.01),
  description: yup.string(),
  isSold: yup.boolean(),
  date: yup.date(),
  images: yup.array().of(yup.object({
    url: yup.mixed().required()
  }))
})

const controllersApiMyGuitarCreate = async (req, res) => {
  try {
    const {
      body,
      session: {
        user: {
          id: userId
        }
      }
    } = req

    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })

    await uploadFileAsync(verifiedData, req)

    const dataToSave = {
      type: verifiedData.type,
      make: verifiedData.make,
      model: verifiedData.model,
      year: verifiedData.year,
      price: verifiedData.price,
      description: verifiedData.description,
      isSold: verifiedData.isSold,
      date: verifiedData.date,
      images: {
        create: verifiedData.images
      }
    }

    const newGuitar = await prisma.guitar.create({
      data: {
        ...dataToSave,
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        images: true
      }
    })

    return res.status(201).json(newGuitar)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyGuitarCreate
