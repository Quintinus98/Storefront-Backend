import { OrderStore, Order } from "../models/order";

import supertest from "supertest";
import app from "../server";
import { authorization } from "./1usersSpec";
import { DashboardQueries } from "../services/dashboard";

const request = supertest(app);

const dashboard = new DashboardQueries();
const orderStore = new OrderStore();


describe('Orders API test', () => {
  it('GET /orders', async () => {
    const response = await request
      .get('/orders')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
    expect(response.body).toEqual([]);
  });

  it('POST /orders', async () => {
    const response = await request
      .post('/orders')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
    expect(response.body).toEqual({
      "id": 1,
      "status": "active",
      "user_id": "1"
    })
  });
  it('GET /orders/:id', async () => {
    const response = await request
      .get('/orders/1')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
    expect(response.body).toEqual({
      "id": 1,
      "status": "active",
      "user_id": "1"
    })
  });

  // it('POST /orders/:id/products', async () => {
  //   const response = await request
  //     .post('/orders/1/products')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', authorization)
  //     .send({
  //       "product_id": 1,
  //       "quantity": 4
  //     })
  //   expect(response.body).toEqual({
  //     "id": 1,
  //     "quantity": 4,
  //     "order_id": "1",
  //     "product_id": "1"
  //   })
  // });

  it('POST /orders/:id', async () => {
    const response = await request
      .post('/orders/1')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
    expect(response.body).toEqual({
      "id": 1,
      "status": "complete",
      "user_id": "1"
    })
  });

  it('GET /completed_orders', async () => {
    const response = await request
      .get('/completed_orders')
      .set('Accept', 'application/json')
      .set('Authorization', authorization)
      .expect(200)
  });

});

describe("Deleting API data", () => {
  it('DELETE /orders/:id', async () => {
    const reponse = await request
      .delete('/orders/1')
      .set('Authorization', authorization)
      .set('Accept', 'application/json')
    expect(reponse.body).toEqual('Deleted successfully!');
  });

  it('DELETE /products/:id', async () => {
    const reponse = await request
      .delete('/products/1')
      .set('Authorization', authorization)
      .set('Accept', 'application/json')
    expect(reponse.body).toEqual('Deleted successfully!');
  });

  it('DELETE /users/:id', async () => {
    const reponse = await request
      .delete('/users/1')
      .set('Authorization', authorization)
      .set('Accept', 'application/json')
    expect(reponse.body).toEqual('Deleted successfully!');
  });
})


describe("Order Model", () => {
  it("should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });

  it("should have an create method", () => {
    expect(orderStore.create).toBeDefined();
  });
  
  it("should have an show method", () => {
    expect(orderStore.show).toBeDefined();
  });

  it("should have an completeOrder method", () => {
    expect(orderStore.completeOrder).toBeDefined();
  });

  it("should have an addProduct method", () => {
    expect(orderStore.addProduct).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(orderStore.delete).toBeDefined();
  });
});


describe("Dashboard Model", () => {
  it("should have an completedOrders method", () => {
    expect(dashboard.completedOrders).toBeDefined();
  });

})