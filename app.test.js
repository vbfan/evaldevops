const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
    it('debe retornar index.html', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});

describe('GET /autores', () => {
    it('debe retornar autores.html', async () => {
        const response = await request(app).get('/autores');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});
