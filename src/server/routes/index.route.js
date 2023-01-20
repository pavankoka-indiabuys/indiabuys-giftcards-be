import express from 'express'
// import userRoutes from './user.route'
import authRoutes from './auth.route.js'
// import timelineRoutes from './timeline.route';
// import graphqlRoutes from './graphql.route';

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

router.get('/ip', (req, res) => {
    const ip = req.socket.localAddress
    res.send(`Hey, your ip address is: ${ip}`)
})

// mount user routes at /users
// router.use('/users', userRoutes)

// // mount auth routes at /auth
router.use('/auth', authRoutes)

// // mount timeline routes at /timeline
// router.use('/timelines', timelineRoutes);

// // mount graphql schema for development
// router.use(graphqlRoutes);

export default router
