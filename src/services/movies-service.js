import sqlBricks from 'sql-bricks'
import { select } from '../models/db.js';

export function getIntervals() {
    const query = sqlBricks.select('*').from('movies').where('winner', 'yes').orderBy('year').toString()

    const movies = select(query);

    const mapProd = new Map();
    let minVal = -1, maxVal = -1;
    const intervalArr = [];

    for (const movie of movies) {

        let lastYear = mapProd.get(movie.producer);
        if (lastYear) {
            const interval = movie.year - lastYear;

            if (minVal == -1 || minVal > interval)
                minVal = interval;

            if (maxVal == -1 || maxVal < interval)
                maxVal = interval;

            intervalArr.push({ "producer": movie.producer, "interval": interval, "previousWin": lastYear, "followingWin": movie.year });
        }
        mapProd.set(movie.producer, movie.year);
    }

    return { min: intervalArr.filter(i => i.interval == minVal), max: intervalArr.filter(i => i.interval == maxVal) };
}
