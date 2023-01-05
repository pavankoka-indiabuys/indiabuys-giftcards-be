// import express from 'express'
// import cors from 'cors'
// import { Users } from './firebase'
// const app = express()

import config from '../config/config'
import app from '../config/express'

import debug from 'debug'
debug('node-express-firebase:index')

app.listen(config.port, '0.0.0.0', () => {
    console.info(`server started on port ${config.port} (${config.env})`)
})

// app.use(express.json())
// app.use(cors())

// app.get('/', async (req, res) => {
//     const snapshot = await Users.get()
//     const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

//     res.send(list)
// })

// app.post('/create', async (req, res) => {
//     const data = req.body
//     await Users.add({ data })
//     res.send({ msg: 'User Added' })
// })

// app.post('/update', async (req, res) => {
//     const id = req.body.id
//     delete req.body.id
//     await Users.doc(id).update(req.body)
//     res.send({ msg: 'User Updated' })
// })

// app.post('/delete', async (req, res) => {
//     const id = req.body.id
//     await Users.doc(id).delete()
//     res.send({ msg: 'User Deleted' })
// })

// app.listen(4000, () => console.log('running on port 4000'))
