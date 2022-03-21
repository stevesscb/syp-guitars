/* eslint-disable linebreak-style */
import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  type: yup.string().required(),
  make: yup.string(),
  model: yup.string(),
  year: yup.number(),
  price: yup.number().min(0.01),
  description: yup.string(),
  isSold: yup.boolean(),
  date: yup.date()
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

    const newGuitar = await prisma.guitar.create({
      data: {
        ...verifiedData,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    return res.status(201).json(newGuitar)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyGuitarCreate
