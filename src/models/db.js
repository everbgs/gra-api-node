import { DatabaseSync } from "node:sqlite"
import sqlBricks from 'sql-bricks'

const database = new DatabaseSync(':memory:');

function runSeed() {
    database.exec('DROP TABLE IF EXISTS movies')
    database.exec(`
        CREATE TABLE movies(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            studios TEXT NOT NULL,
            producer TEXT NOT NULL,
            year INTEGER NOT NULL,
            winner TEXT
        ) STRICT
    `);
}

export function insert({ table, items }) {
    const { text, values } = sqlBricks.insertInto(table, items).toParams({ placeholder: '?' })
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
}

export function select(query) {
    return database.prepare(query).all()
}

runSeed();

export default database;
