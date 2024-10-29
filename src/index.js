import express from 'express'
import routerProducers from "./routes/movies-route.js";
import { loadCsvData } from './load-csv-data.js';
import configEnv from './config/config-env.js';
import { createServer } from 'node:http'

loadCsvData();

const PORT = configEnv.port;

const server = express()
server.use(express.json())
server.use('/api', routerProducers)

const app = createServer(server)
  .listen(3000, () => console.log(`Servidor rodando com sucesso ${PORT}`))

export { app };
