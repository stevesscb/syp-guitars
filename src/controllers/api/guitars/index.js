import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersMyGuitars = async (req, res) => {
  try {
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    const foundGuitars = await prisma.guitar.findMany({
      orderBy: {
        [orderBy]: sortBy
      }
    })

    return res.status(200).json(foundGuitars)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersMyGuitars
