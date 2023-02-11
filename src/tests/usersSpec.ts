import { User, user } from "../models/user";

const userStore = new User();


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
    const myWeapon: user = {
      firstname: "David",
      lastname: "Obodo",
      username: "Quentinsop",
      password: "mynigga"
    };
    const result = await userStore.create(myWeapon);
    expect(result).toBeDefined();
  });
  it("should authenticate a user", async () => {
    const myWeapon = {
      username: "Quentinsop",
      password: "mynigga",
    };
    const result = await userStore.authenticate(myWeapon);
    expect(result).toBeDefined();
  });
  it("should have an delete method", () => {
    expect(userStore.delete).toBeDefined();
  });
  it("should delete a user",async () => {
    await userStore.delete(1);
    const result = await userStore.index();
    expect(result).toEqual([]);
  });
});