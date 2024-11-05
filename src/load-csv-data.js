import { accessSync, constants, createReadStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import csvtojson from 'csvtojson'
import { Transform, Writable } from 'node:stream'
import { insert } from './models/db.js'
import configEnv from './config/config-env.js'

export function loadCsvData() {
    try {
        accessSync(configEnv.csv, constants.F_OK | constants.R_OK);

        pipeline(
            createReadStream(configEnv.csv),
            csvtojson({ headers: ['year', 'title', 'studios', 'producers', 'winner'], delimiter: ';' }),
            new Transform({
                objectMode: true,
                transform(chunk, enc, callback) {
                    const data = JSON.parse(Buffer.from(chunk))
                    return callback(null, JSON.stringify(data))
                }
            }),
            new Writable({
                write(chunck, enc, callback) {
                    const movie = JSON.parse(chunck.toString());

                    const year = parseInt(movie.year);
                    const title = movie.title;
                    const studios = movie.studios;
                    const producers = movie.producers;
                    const winner = movie.winner ? movie.winner.toLowerCase() : 'false';

                    if (!isNaN(year) && title && studios && producers && winner) {
                        const producersArr = producers.replace(' and ', ',').split(',').filter(Boolean);
                        for (const producer of producersArr) {
                            insert({
                                table: 'movies', items: {
                                    title,
                                    studios,
                                    producer: producer.trim(),
                                    year,
                                    winner,
                                }
                            });
                        }
                    } else
                        console.error('Invalid row data:', chunck.toString());


                    callback();
                }
            })
        );

    } catch (err) {
        console.error("Erro ao processar csv: " + err);
    }

}
