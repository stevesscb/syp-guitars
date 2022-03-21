import { Router } from 'express'

import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | USER
router.post('/api/user/signup', (await import('./controllers/api/user/signup.js')).default)
router.post('/api/user/login', (await import('./controllers/api/user/login.js')).default)
router.delete('/api/user/logout', (await import('./controllers/api/user/logout.js')).default)

// API | MY GUITARS
router.get('/api/my/guitars', authenticateUser('json'), (await import('./controllers/api/my/guitars/index.js')).default)
router.post('/api/my/guitars/create', authenticateUser('json'), (await import('./controllers/api/my/guitars/create.js')).default)
router.delete('/api/my/guitars/:id', authenticateUser('json'), (await import('./controllers/api/my/guitars/destroy.js')).default)
router.get('/api/my/guitars/:id', authenticateUser('json'), (await import('./controllers/api/my/guitars/show.js')).default)
router.put('/api/my/guitars/:id', authenticateUser('json'), (await import('./controllers/api/my/guitars/update.js')).default)

export default router
