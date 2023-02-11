import { MythicalWeaponStore } from "../models/mythical_weapons";

const mythicalStore = new MythicalWeaponStore();


describe("Mythical Weapon Model", () => {
  it("should have an index method", () => {
    expect(mythicalStore.index).toBeDefined();
  });
  it("index method should return a list of products",async () => {
    const result = await mythicalStore.index();
    expect(result).toEqual([]);
  });
  it("should have an show method", () => {
    expect(mythicalStore.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(mythicalStore.create).toBeDefined();
  });
  it("should create a mythical weapon", async () => {
    const myWeapon = {
      name: "Saber",
      type: "light",
      weight: 2
    };
    const result = await mythicalStore.create(myWeapon);
    expect(result).toEqual({
      id: 1,
      name: "Saber",
      type: "light",
      weight: 2
    });
  });
  it("should have an delete method", () => {
    expect(mythicalStore.delete).toBeDefined();
  });
  it("should delete a mythical weapon",async () => {
    mythicalStore.delete(1);
    const result = await mythicalStore.index();
    expect(result).toEqual([]);
  });
});