import { ProductStore } from "../models/product";
import supertest from "supertest";
import app from "../server";
import { authorization } from "./1usersSpec";

const productStore = new ProductStore();
const request = supertest(app);

describe('Products API test', () => {
  it('GET /products', async () => {
    const reponse = await request
      .get('/products')
      .set('Accept', 'application/json')
    expect(reponse.body).toEqual([]);
  });

  it('POST /products', async () => {
    await request
      .post('/products')
      .set('Authorization', authorization)
      .send({
        "name": "BlueBand",
        "price": 1500})
      .expect(200, {
        "id": 1,
        "name": "BlueBand",
        "price": 1500
      })
  })

  it('PUT /products/:id', async () => {
    await request
      .put('/products/1')
      .set('Authorization', authorization)
      .send({
        "name": "BlueBand",
        "price": 1700
      })
      .expect(200, {
        "id": 1,
        "name": "BlueBand",
        "price": 1700
      })
  })

  it('GET /products/:id', async () => {
    const reponse = await request
      .get('/products/1')
      .set('Accept', 'application/json')
    expect(reponse.body).toEqual({
      "id": 1,
      "name": "BlueBand",
      "price": 1700
    });
  });
});

describe("Product Model Function Defined", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });
  it("should have an show method", () => {
    expect(productStore.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(productStore.create).toBeDefined();
  });
  it("should have an update method", () => {
    expect(productStore.update).toBeDefined();
  });
  it("should have an delete method", () => {
    expect(productStore.delete).toBeDefined();
  });
});