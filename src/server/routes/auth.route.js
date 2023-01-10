import express from 'express'
// import expressJwt from 'express-jwt'
// import { doc, getDoc } from 'firebase/firestore'
// import authCtrl from '../controllers/auth.controller'
// import config from '../../config/config'

import { Users } from '../../../firebase'

const router = express.Router() // eslint-disable-line new-cap

router.get('/users', async (req, res) => {
    const snapshot = await Users.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    res.send(list)
})

router.post('/user/sign-up', async (req, res) => {
    const data = {
        name: req.body.name,
        college: req.body.college,
        age: req.body.age,
    }
    const id = req.body.id ? req.body.id : '1729'
    await Users.doc(id).set(data)

    const userRef = Users.doc('1729')
    const doc = await userRef.get()

    res.send(doc.data())
})

router.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const userRef = Users.doc(id.toString())
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
