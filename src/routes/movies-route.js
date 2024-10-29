import express from 'express'
import { buscarIntervalos } from '../controllers/movies-controller.js';

const routerProducers = express.Router();

routerProducers.get('/producers/intervals', buscarIntervalos);

export default routerProducers;