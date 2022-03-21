/* eslint-disable linebreak-style */
import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'
import uploadFileAsync from '../../_helpers/upload-file.js'

const signupSchema = yup.object({
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  }),
  username: yup.string().required().test({
    message: () => 'User name already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({ where: { username: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  }),
  password: yup.string().min(6).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
})

const controllersApiUserSignup = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await signupSchema.validate(body, { abortEarly: false, stripUnknown: true }) // add stripUnknown: true

    // To proceed without waiting for file upload to s3, use without await.
    // To wait for file to finish uploading to s3, use await
    await uploadFileAsync(verifiedData, req) // add this line!

    const dataToSave = {
      email: verifiedData.email,
      username: verifiedData.username,
      passwordHash: await bcrypt.hash(verifiedData.password, 10)
    }
    const newUser = await prisma.user.create({ data: dataToSave })

    req.session.user = { id: newUser.id }
    await req.session.save()

    return res.status(201).json(_.omit(newUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiUserSignup
