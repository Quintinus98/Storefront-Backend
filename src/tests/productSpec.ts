import { ProductStore } from "../models/product";

const productStore = new ProductStore();


describe("Product Model", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });
  it("index method should return a list of products",async () => {
    const result = await productStore.index();
    expect(result).toEqual([]);
  });
  it("should have an show method", () => {
    expect(productStore.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(productStore.create).toBeDefined();
  });
  it("should create a new Product", async () => {
    const myProduct = {
      name: "Redmi S2",
      price: 57000
    };
    const result = await productStore.create(myProduct);
    expect(result).toEqual({
      id: 1,
      name: "Redmi S2",
      price: 57000
    });
  });
  it("should have an delete method", () => {
    expect(productStore.delete).toBeDefined();
  });
  it("should delete a product",async () => {
    productStore.delete(1);
    const result = await productStore.index();
    expect(result).toEqual([]);
  });
});