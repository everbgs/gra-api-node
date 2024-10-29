import 'dotenv/config'
import env from 'env-var'

const configEnv = {
    port: env.get('PORT').default(3000).asInt(),
    csv: env.get('CSV').default('./src/data/movielist.csv').asString()
}

export default configEnv;
