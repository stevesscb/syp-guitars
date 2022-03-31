import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiGuitarsDestroy = async (req, res) => {
  try {
    const { params: { id } } = req

    console.log('>>>>>>', Number(id))
    const deletedGuitar = await prisma.Guitar.delete({ where: { id: Number(id) } })
    return res.status(200).json(deletedGuitar)
  } catch (err) {
    // console.log(err) // don't do this since we already have handleErrors
    return handleErrors(res, err)
  }
}

export default [
  controllersApiGuitarsDestroy
]
