import dotenv from 'dotenv'
dotenv.config()

const { error, ...envVars } = process.env
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    env: envVars?.NODE_ENV,
    port: envVars?.PORT,
    keys: {
        woohoo: {
            clientId: envVars.WOOHOO_CLIENT_ID,
            clientSecret: envVars.WOOHOO_CLIENT_SECRET,
            username: envVars.WOOHOO_USERNAME,
            password: envVars.WOOHOO_PASSWORD,
            endpoint: envVars.WOOHOO_ENDPOINT,
        },
    },
}

export default config
