import { UserStore, user } from "../models/user";

const userStore = new UserStore();


describe("User Model", () => {
  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });
  it("index method should return a list of products",async () => {
    const result = await userStore.index();
    expect(result).toEqual([]);
  });
  it("should have an show method", () => {
    expect(userStore.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(userStore.create).toBeDefined();
  });
  it("should create a new user", async () => {
    const newUser: user = {
      firstname: "David",
      lastname: "Obodo",
      password: "mynigga"
    };
    const result = await userStore.create(newUser);
    expect(result).toBeDefined();
  });
  it("should have an update method",async () => {
    expect(userStore.update).toBeDefined();
  });
  it("should update an existing user",async () => {
    const updatedUser: user = {
      firstname: "Peter",
      lastname: "Obodo",
      password: "ccross"
    };
    const id = "2";
    const result = await userStore.update(updatedUser, id);
    expect(result).toBeDefined();
  });
  it("should authenticate a user", async () => {
    const authUser = {
      firstname: "Quentinsop",
      password: "mynigga",
    };
    const result = await userStore.authenticate(authUser);
    expect(result).toBeDefined();
  });
  it("should have an delete method", () => {
    expect(userStore.delete).toBeDefined();
  });
  it("should delete a user",async () => {
    await userStore.delete(2);
    const result = await userStore.index();
    expect(result).toEqual([]);
  });
});