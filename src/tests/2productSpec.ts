import { ProductStore } from "../models/product";
import supertest from "supertest";
import app from "../server";

declare let process: {
  env: {
    [key: string]: string;
  }
};

const productStore = new ProductStore();
const request = supertest(app);



describe("Test Product Definition", () => {
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

  describe("Test Products API", () => {

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
  
    it("GET /products", async () => {
      const reponse = await request
        .get("/products")
        .set("Accept", "application/json");
      expect(reponse.body).toEqual([]);
    });
  
    it("POST /products", async () => {
      await request
        .post("/products")
        .set("Authorization", process.env.Authorization)
        .send({
          "name": "BlueBand",
          "price": 1500})
        .expect(200, {
          "id": 1,
          "name": "BlueBand",
          "price": 1500
        });
    });
  
    it("PUT /products/:id", async () => {
      await request
        .put("/products/1")
        .set("Authorization", process.env.Authorization)
        .send({
          "name": "BlueBand",
          "price": 1700
        })
        .expect(200, {
          "id": 1,
          "name": "BlueBand",
          "price": 1700
        });
    });
  
    it("GET /products/:id", async () => {
      const reponse = await request
        .get("/products/1")
        .set("Accept", "application/json");
      expect(reponse.body).toEqual({
        "id": 1,
        "name": "BlueBand",
        "price": 1700
      });
    });
  });

  describe("Test Product Model", () => {
    it("index method should return a list of products",async () => {
      const result = await productStore.index();
      expect(result.length).toBeGreaterThan(0);
    });
    it("fetch product with index 1", async () => {
      const result = await productStore.show(1);
      expect(result).toEqual({
        "id": 1,
        "name": "BlueBand",
        "price": 1700
      });
    });
    it("should create a new Product", async () => {
      const myProduct = {
        name: "Redmi S2",
        price: 57000
      };
      const result = await productStore.create(myProduct);
      expect(result).toEqual({
        id: 2,
        name: "Redmi S2",
        price: 57000
      });
    });
    it("should update product 2's price.", async () => {
      const myProduct = {
        name: "Redmi S2",
        price: 59000
      };
      const result = await productStore.update(myProduct, "2");    
      expect(result).toEqual({
        id: 2,
        name: "Redmi S2",
        price: 59000
      });
    });
    it("should delete product 2",async () => {
      const result = await productStore.delete(2);
      expect(result).toEqual("Deleted successfully!");
    });
  });
});






