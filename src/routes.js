import { Router } from 'express'

import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | USER
router.post('/api/user/signup', (await import('./controllers/api/user/signup.js')).default)
router.post('/api/user/login', (await import('./controllers/api/user/login.js')).default)
router.delete('/api/user/logout', (await import('./controllers/api/user/logout.js')).default)

// API | MY GUITARS
router.post('/api/my/guitars/create', authenticateUser('json'), (await import('./controllers/api/my/guitars/create.js')).default)

// STATIC
router.get('/', (await import('./controllers/static/home.js')).default)

export default router
