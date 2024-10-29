import assert, { strictEqual } from "node:assert"
import { after, before, describe, it } from "node:test"
import path from 'node:path'
import { fileURLToPath } from "node:url"
import { readFileSync } from "node:fs"


const URL_BASE = 'http://localhost:3000'

describe('Teste API', () => {
    let _server = {}
    let _responseTest = {};

    before(async () => {
        _server = (await import('../index.js')).app
        await new Promise(resolve => _server.once('listening', resolve))

        const __dirname = path.dirname(fileURLToPath(import.meta.url))

        const filePath = path.join(__dirname, 'response-test.json')
        const fileContents = readFileSync(filePath, 'utf8')
        _responseTest = JSON.parse(fileContents);
    })
    after(done => _server.close(done))

    it('Test endpoint errado', async () => {
        const request = await fetch(`${URL_BASE}/api/producers/movie`, {
            method: 'GET'
        })
        strictEqual(request.status, 404)
    })

    it('api/producers/intervals (GET)', async () => {
        const request = await fetch(`${URL_BASE}/api/producers/intervals`, {
            method: 'GET'
        })
        strictEqual(request.status, 200)

        const response = await request.json()
        assert.ok(response.hasOwnProperty('min'), 'Expected property "min"');
        assert.ok(response.hasOwnProperty('max'), 'Expected property "max"');
        assert.deepStrictEqual(response, _responseTest, 'Expected body to match _responseTest');
    })


})
