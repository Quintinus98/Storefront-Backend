import supertest from "supertest";

import { UserStore } from "../models/user";
import app from "../server";


const userStore = new UserStore();
const request = supertest(app);

export const authorization: string = 
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IkRhdmlkIiwibGFzdG5hbWUiOiJPYm9kbyIsInBhc3N3b3JkIjoiJDJiJDEwJHNtcmgvRVNvVll4TjQ5RVNuT1VGTE9KNUMzUng1VFlENVlkdS9EQy91SkRacnRIZGNOdGM2IiwiaWQiOjF9LCJpYXQiOjE2NzYyOTM3ODV9.bLXeXpW8Bcfm_tjnx87qimOW9UcWgpXZcOUnOklXIJQ"

/**
 * Please Note.
 * 
 * For your environment variables use    TOKEN_SECRET=quentin98!
 * If you use any other apart from that, you will need to change the authorization string. 
 * 
 * If you must provide your own details be sure to generate a Token and replace it
 * with the one I have provided (authorization).
 * 
 * Looking at your code errors, it appears that your tests are failing because of
 * an invalid signature. 
 */


describe('Users API test', () => {
  it('POST /users', async () => {
    await request
      .post('/users')
      .send({
        "firstname": "David",
        "lastname": "Obodo",
        "password": "mynigga"
      })
      .expect(200)
  });
  
  it('POST /users/auth', async () => {
    await request
      .post('/users/auth')
      .send({
        "firstname": "David",
        "password": "mynigga"
      })
      .expect(200)
  });

  it('GET /users', async () => {
    const response = await request
      .get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
    expect(response.body).not.toEqual([]);
  });


  it('PUT /users/:id', async () => {
    const response = await request
      .put('/users/1')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
      .send({
        "firstname": "Peter",
        "lastname": "Obodo",
        "password": "mynigga"
      })
      .expect(200);
  })

  it('GET /users/:id', async () => {
    const response = await request
      .get('/users/1')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
      .expect(200)
    expect(response.body).not.toEqual([])
  });
});

describe("User Model", () => {
  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });
  it("should have an show method", () => {
    expect(userStore.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(userStore.create).toBeDefined();
  });
  it("should have an update method", () => {
    expect(userStore.update).toBeDefined();
  });
  it("should have an authenticate method", () => {
    expect(userStore.authenticate).toBeDefined();
  });
  it("should have an delete method", () => {
    expect(userStore.delete).toBeDefined();
  });
});