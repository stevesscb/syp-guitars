import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const updateSchema = yup.object({
  type: yup.string().required(),
  make: yup.string(),
  model: yup.string(),
  year: yup.number(),
  price: yup.number().min(0.01),
  description: yup.string(),
  isSold: yup.boolean(),
  date: yup.date()
})

const controllersApiGuitarsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.guitar.update({
      where: {
        id: Number(id)
      },
      data: {
        ...verifiedData
        // category: {
        //   connectOrCreate: {
        //     where: {
        //       name: verifiedData.category.name
        //     },
        //     create: {
        //       name: verifiedData.category.name,
        //       type: verifiedData.type
        //     }
        //   }
        // }
      }
    })
    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  controllersApiGuitarsUpdate
]
