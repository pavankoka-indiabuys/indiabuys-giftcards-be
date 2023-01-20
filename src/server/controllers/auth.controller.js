import jwt from 'jsonwebtoken'
import admin from 'firebase-admin'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError.js'
import config from '../../config/config.js'

const serviceAccount = require('../../adminsdk-private-dev.json')

// rename this into any debugging string you wish to run on terminal
const debug = require('debug')('node-express-firebase:index')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseUrl,
})

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity

    // Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
    // The Firebase ID token needs to be passed as a Bearer token:
    // `Authorization: Bearer <Firebase ID Token>`.
    // when decoded successfully, the ID Token content will be added as `req.user`.
    debug('Check if request is authorized with Firebase ID token')

    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true)

    /**
     * Check body if ther is Firebase ID Token
     * @param req
     * @param res
     * @returns {err}
     */
    if (!req.body.token) {
        debug('Token is not requested')
        return next(err)
    }

    const idToken = req.body.token
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedIdToken) => {
            debug('ID Token correctly decoded', decodedIdToken)
            const token = jwt.sign(
                {
                    uid: decodedIdToken.uid,
                },
                config.jwtSecret,
            )
            /**
             * If Success then will return jwt token with uid and email
             */
            // next();
            return res.json({ token })
            // This is a token that sign from the serve
        })
        .catch((error) => {
            debug('Error while verifying Firebase ID token:', error)
            return next(err)
        })
    return err
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100,
    })
}

const isValidToken = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req
            const userInfo = await admin.auth().verifyIdToken(authToken)

            req.authId = userInfo.uid
            await db
                .collection('ProfileDetails')
                .where('FirebaseToken', '==', authToken)
                .get()
                .then(async (querySnapshot) => {
                    if (querySnapshot && querySnapshot.size > 0) {
                        return next()
                    } else {
                        return res.send({
                            status: false,
                            error: 'Oops! Invalid Login or Login session expired... Please login again.',
                        })
                    }
                })

            // return next();
        } catch (e) {
            const { authToken } = req
            return res.send({
                status: false,
                error: 'Invalid Login or Login session expired ..., Please login again',
            })
        }
    })
}

export default { login, isValidToken, getRandomNumber }
