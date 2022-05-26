const request = require('supertest');
const app = require('../app.js');
const createItem = require('../database_access_service/createItem.js');
const { conn } = require('../db.js');

describe('GET /todos endpoint', () => {
  it('should return an empty array when there are no items', async () => {
    await conn.sync({ force: true });
    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });
  it('should return an array of objects with an "id" (number), "name" (string) and a "completed" (boolean)', async () => {
    await createItem('test 1');
    await createItem('test 2');
    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
});

describe('POST /todos endpoint', () => {
  it('should create and return an object with a numerical id, the given name and set completed to false', () => {
    return request(app)
      .post('/todos')
      .send({ name: 'test my app' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: 'test my app',
            completed: false,
          })
        );
      });
  });
  it('should get a 422 status code when the name value type is not a string', () => {
    return request(app).post('/todos').send({ name: 123456 }).expect(422);
  });
});

describe('GET /todos/id endpoint', () => {
  it('should return an object with id (number), name (string) and completed (boolean)', () => {
    return request(app)
      .get('/todos/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });
  it('should get a 404 status code when there is not a to-do item with the asked id', () => {
    return request(app).get('/todos/99999').expect(404);
  });
});

describe('PUT /todos/id endpoint', () => {
  it('should return the modified object with the corresponding id, with the name and or completed state changed', () => {
    return request(app)
      .put('/todos/1')
      .send({ name: 'test it this way', changeCompleted: true })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 1,
            name: 'test it this way',
            completed: true,
          })
        );
      });
  });
  it('should only change the name if a new name is sent on the request body', () => {
    return request(app)
      .put('/todos/1')
      .send({ name: 'test it this way' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 1,
            name: 'test it this way',
            completed: true,
          })
        );
      });
  });
  it('should only change the completion state if the request body has changeCompleted set to true', () => {
    return request(app)
      .put('/todos/1')
      .send({ changeCompleted: true })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 1,
            name: 'test it this way',
            completed: false,
          })
        );
      });
  });
  it('should get a 422 status code when called without name/changedCompleted in the request body', () => {
    return request(app)
      .put('/todos/99999')
      .send({ name: 'test it this way', changeCompleted: true })
      .expect(404);
  });
  it('should get a 404 status code when there is not a to-do item with the asked id', () => {
    return request(app)
      .put('/todos/99999')
      .send({ name: 'test it this way', changeCompleted: true })
      .expect(404);
  });
});

describe('DELETE /todos/id endpoint', () => {
  it('should delete the corresponding to-do item and get a 204 status code', () => {
    return request(app)
      .delete('/todos/1')
      .expect(204)
      .then(function () {
        request(app).get('/todos/1').expect(404);
      });
  });
  it('should get a 404 status code when there is not a to-do item with the asked id', () => {
    return request(app).delete('/todos/99999').expect(404);
  });
});
