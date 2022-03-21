import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiGuitarsDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedGuitar = await prisma.guitar.delete({ where: { id: Number(id) } })
    return res.status(200).json(deletedGuitar)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  controllersApiGuitarsDestroy
]
