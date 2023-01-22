import express from 'express'
import { v4 } from 'uuid'
// import expressJwt from 'express-jwt'
// import { doc, getDoc } from 'firebase/firestore'
// import authCtrl from '../controllers/auth.controller'
// import config from '../../config/config'

import { db, users } from '../../../firebase.js'

const router = express.Router() // eslint-disable-line new-cap

const verify = (req, res, next) => {
    console.log(req, res)
    next()
}

router.get('/users', async (req, res) => {
    console.log('------------ inn -----------')
    const snapshot = await users.get()
    const list = snapshot.docs.map((doc) => doc.data())

    res.send(list)
})

router.post('/user/sign-up', async (req, res) => {
    const uid = req.body.phone.toString().split(' ').join('')
    const uuid = v4()
    const data = {
        name: req.body.name,
        college: req.body.college,
        age: req.body.age,
        phone: req.body.phone,
        uuid,
    }
    const response = await db.collection('users').doc(uid).set(data)

    res.send(response)
})

router.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const userRef = users.doc(id.toString())
    const snapshot = await userRef.get()
    const data = snapshot.data()

    res.send(data)
})

// /** POST /api/auth/login - Returns token if correct firebase token is provided */
// router.route('/login').post(authCtrl.login)

// /** GET /api/auth/random-number - Protected route,
//  * needs token returned by the above as header. Authorization: Bearer {token} */
// router
//     .route('/random-number')
//     .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber)

export default router
