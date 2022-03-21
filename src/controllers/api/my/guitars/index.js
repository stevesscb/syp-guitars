// import moment from 'moment'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyGuitars = async (req, res) => {
  try {
    const userId = req.session.user.id
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    const where = { userId }

    const foundGuitars = await prisma.guitar.findMany({
      where,
      orderBy: {
        [orderBy]: sortBy
      }
    })

    return res.status(200).json(foundGuitars)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyGuitars
