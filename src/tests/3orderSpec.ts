import { OrderStore } from "../models/order";

import supertest from "supertest";
import app from "../server";
import { DashboardQueries } from "../services/dashboard";

const request = supertest(app);

const dashboard = new DashboardQueries();
const orderStore = new OrderStore();

declare let process: {
  env: {
    [key: string]: string;
  }
};
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


  describe("Orders API test", () => {
    beforeAll(async() => {
      const response = await request
        .post("/users/auth")
        .send({
          "firstname": "David",
          "password": "mynigga"
        });
      if (response.body !== null) {
        process.env.Authorization += response.body.substring(0, response.body.length-3);
      }
    });
  
    it("GET /orders", async () => {
      const response = await request
        .get("/orders")
        .set("Accept", "application/json")
        .set("Authorization", process.env.Authorization);
      expect(response.body).toEqual([]);
    });
  
    it("POST /orders", async () => {
      const response = await request
        .post("/orders")
        .set("Accept", "application/json")
        .set("Authorization", process.env.Authorization);
      expect(response.body).toEqual({
        "id": 1,
        "status": "active",
        "user_id": "1"
      });
    });
    it("GET /orders/:id", async () => {
      const response = await request
        .get("/orders/1")
        .set("Accept", "application/json")
        .set("Authorization", process.env.Authorization);
      expect(response.body).toEqual({
        "id": 1,
        "status": "active",
        "user_id": "1"
      });
    });
  
    it("POST /orders/:id", async () => {
      const response = await request
        .post("/orders/1")
        .set("Accept", "application/json")
        .set("Authorization", process.env.Authorization);
      expect(response.body).toEqual({
        "id": 1,
        "status": "complete",
        "user_id": "1"
      });
    });
  
    it("GET /completed_orders", async () => {
      await request
        .get("/completed_orders")
        .set("Accept", "application/json")
        .set("Authorization", process.env.Authorization)
        .expect(200);
    });
  });


  describe("Test Order model", () => {
    it("should display a list of orders",async () => {
      const result = await orderStore.index("1");
      expect(result).toEqual([{
        "id": 1,
        "status": "complete",
        "user_id": "1"
      }]);
    });
  
    it("should display a single order",async () => {
      const result = await orderStore.show(1, "1");
      expect(result).toEqual({
        "id": 1,
        "status": "complete",
        "user_id": "1"
      });
    });
  
    it("should create an order",async () => {
      const myOrder = {
        "status": "active",
        "user_id": "1"
      };
      const result = await orderStore.create(myOrder);
      expect(result).toEqual({
        "id": 2,
        "status": "active",
        "user_id": "1"
      });
    });
  
    it("should complete an order",async () => {
      const status = "complete";
      const user_id = "1";
      const id = 2;
  
      const result = await orderStore.completeOrder(status, id, user_id);
      expect(result).toEqual({
        "id": 2,
        "status": "complete",
        "user_id": "1"
      });
    });
  
    it("should delete order 2", async () => {
      const result = await orderStore.delete(2, "1");
      expect(result).toEqual("Deleted successfully!");
    });
  });
  
  describe("Deleting API data", () => {
    it("DELETE /orders/:id", async () => {
      const reponse = await request
        .delete("/orders/1")
        .set("Authorization", process.env.Authorization)
        .set("Accept", "application/json");
      expect(reponse.body).toEqual("Deleted successfully!");
    });
  
    it("DELETE /products/:id", async () => {
      const reponse = await request
        .delete("/products/1")
        .set("Authorization", process.env.Authorization)
        .set("Accept", "application/json");
      expect(reponse.body).toEqual("Deleted successfully!");
    });
  
    it("DELETE /users/:id", async () => {
      const reponse = await request
        .delete("/users/1")
        .set("Authorization", process.env.Authorization)
        .set("Accept", "application/json");
      expect(reponse.body).toEqual("Deleted successfully!");
    });
  });
});


describe("Dashboard Model", () => {
  it("should have an completedOrders method", () => {
    expect(dashboard.completedOrders).toBeDefined();
  });

});

