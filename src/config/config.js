import dotenv from 'dotenv'
dotenv.config()

const { error, ...envVars } = process.env
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    env: envVars?.NODE_ENV,
    port: envVars?.PORT,
}

export default config
