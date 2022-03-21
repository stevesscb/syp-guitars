// import moment from 'moment'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyChats = async (req, res) => {
  try {
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    const foundChats = await prisma.chat.findMany({
      orderBy: {
        [orderBy]: sortBy
      }
    })

    return res.status(200).json(foundChats)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyChats
