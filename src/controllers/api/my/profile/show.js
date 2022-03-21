import _ from 'lodash'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersMyProfile = async (req, res) => {
  try {
    const {
      session: {
        user: {
          id: userId
        }
      }
    } = req

    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(userId) || 0
      }
    })

    return res.status(200).json(_.omit(foundUser, 'passwordHash'))
  } catch (err) {
    return handleErrors(res, err)
  }
}
export default controllersMyProfile
