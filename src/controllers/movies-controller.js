import { getIntervals } from "../services/movies-service.js";

export function buscarIntervalos(req, res) {
    const intervals = getIntervals();
    return res.status(200).json(intervals);
}
