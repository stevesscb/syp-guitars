import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiGuitarsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundGuitar = await prisma.Guitar.findUnique({
      where: { id: Number(id) },
      include: {
        user: true
      }
    })
    return res.status(200).json(foundGuitar)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  controllersApiGuitarsShow
]
