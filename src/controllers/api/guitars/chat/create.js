/* eslint-disable linebreak-style */
import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  message: yup.string(),
  receiverId: yup.number()
})

const controllersApiGuitarChatCreate = async (req, res) => {
  try {
    const {
      body,
      session: {
        user: {
          id: userId
        }
      },
      // extracts guitarId param from URL
      params: {
        id: guitarId
      }
    } = req

    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })

    const newChat = await prisma.chat.create({
      data: {
        message: verifiedData.message,
        receiver: {
          connect: {
            id: verifiedData.receiverId
          }
        },
        sender: {
          connect: {
            id: userId
          }
        },
        guitar: {
          connect: {
            id: Number(guitarId) || 0
          }
        }
      }
    })

    return res.status(201).json(newChat)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiGuitarChatCreate
