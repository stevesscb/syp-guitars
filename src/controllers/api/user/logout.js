/* eslint-disable linebreak-style */
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiUser = async (req, res) => {
  try {
    await req.session.destroy()

    return res.status(201).json('Successfully Logged Out!')
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiUser
