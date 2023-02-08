import express from 'express'
import { v4 } from 'uuid'
// import expressJwt from 'express-jwt'
// import { doc, getDoc } from 'firebase/firestore'
import { getWoohooAuthorizationToken } from '../controllers/auth.controller.js'
// import config from '../../config/config'

import { db, users } from '../../../firebase.js'

const router = express.Router() // eslint-disable-line new-cap

const verify = (req, res, next) => {
    console.log(req, res)
    next()
}

router.get('/users', async (req, res) => {
    const snapshot = await users.get()
    const list = snapshot.docs.map((doc) => doc.data())

    res.send(list)
})

router.post('/user/sign-up', async (req, res) => {
    try {
        const uid = req.body.phone.toString().split(' ').join('')
        const userRef = db.collection('users').doc(uid)
        const snapshot = await userRef.get()
        const data = snapshot.data()

        if (data) {
            res.status(401).send({
                status: 401,
                message: 'User alraedy Registerd with us! Try Sign in!',
            })
        }

        const uuid = v4()
        const payload = { ...req.body, uuid }
        const response = await db.collection('users').doc(uid).set(payload)

        if (response) {
            res.send((await userRef.get()).data())
        } else {
            res.status(401).send({
                status: 401,
                message: 'User not Registerd with us! Try again after Sign-up!',
            })
        }
    } catch (err) {
        res.status('400').send({ status: 400, message: err.message })
    }
})

router.post('/user/sign-in', async (req, res, next) => {
    const uid = req.body.phone.toString().split(' ').join('')
    const userRef = db.collection('users').doc(uid)
    const snapshot = await userRef.get()
    const data = snapshot.data()

    if (data) {
        res.send(data)
    } else {
        res.status(401).send({
            status: 401,
            message: 'User not Registerd with us! Try again after Sign-up!',
        })
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userRef = db.collection('users').doc(id.toString())
        const snapshot = await userRef.get()
        const data = snapshot.data()

        res.send(data)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
        })
    }
})

router.get('/token', async (req, res) => {
    try {
        const token = await getWoohooAuthorizationToken()

        res.send(token)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
        })
    }
})

// /** POST /api/auth/login - Returns token if correct firebase token is provided */
// router.route('/login').post(authCtrl.login)

// /** GET /api/auth/random-number - Protected route,
//  * needs token returned by the above as header. Authorization: Bearer {token} */
// router
//     .route('/random-number')
//     .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber)

export default router
