import supertest from "supertest";

import { UserStore, user } from "../models/user";
import app from "../server";


const userStore = new UserStore();
const request = supertest(app);

declare let process: {
  env: {
    [key: string]: string;
  }
};


describe("Test User Definition", () => {
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

  describe("Test Users API", () => {
    it("POST /users", async () => {
      const response = await request
        .post("/users")
        .send({
          "firstname": "David",
          "lastname": "Obodo",
          "password": "mynigga"
        });
      process.env.Authorization += response.body;
      expect(response.status).toBe(200);
    });
    
    it("POST /users/auth", async () => {
      await request
        .post("/users/auth")
        .send({
          "firstname": "David",
          "password": "mynigga"
        })
        .expect(200);
    });
  
    it("GET /users", async () => {
      const response = await request
        .get("/users")
        .set("Accept", "application/json")
        .set("Authorization", `${process.env.Authorization}`);
      expect(response.body).not.toEqual([]);
    });
  
  
    it("PUT /users/:id", async () => {
      await request
        .put("/users/1")
        .set("Accept", "application/json")
        .set("Authorization", `${process.env.Authorization}`)
        .send({
          "firstname": "Peter",
          "lastname": "Obodo",
          "password": "mynigga"
        })
        .expect(200);
    });
  
    it("GET /users/:id", async () => {
      const response = await request
        .get("/users/1")
        .set("Accept", "application/json")
        .set("Authorization", `${process.env.Authorization}`)
        .expect(200);
      expect(response.body).not.toEqual([]);
    });
  });

  describe("Test User Model", () => {
    it("index method should return a list of users",async () => {
      const result = await userStore.index();
      expect(result.length).toBeGreaterThan(0);
    });
    it("should create a new user", async () => {
      const newUser: user = {
        firstname: "Peter",
        lastname: "Chidi",
        password: "mynigga"
      };
      const result = await userStore.create(newUser);
      expect(result.lastname).toEqual("Chidi");
    });
    it("should update an existing user",async () => {
      const updatedUser: user = {
        firstname: "Peter",
        lastname: "Obodo",
        password: "ccross"
      };
      const id = 2;
      const result = await userStore.update(updatedUser, id);
      expect(result.lastname).toEqual("Obodo");
    });
    it("should authenticate a user", async () => {
      const authUser = {
        firstname: "Peter",
        password: "mynigga",
      };
      const result = await userStore.authenticate(authUser);
      expect(result).toBeInstanceOf(Object);
    });
    it("should delete a user",async () => {
      await userStore.delete(2);
      const result = await userStore.index();
      expect(result.length).toEqual(1);
    });
  });
});

