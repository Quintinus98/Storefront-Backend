import { OrderStore, Order } from "../models/order";
import { UserStore, user } from "../models/user";


const orderStore = new OrderStore();
const userStore = new UserStore();


describe("Order Model", () => {
    it("should create a new user", async () => {
        const newUser: user = {
          firstname: "David",
          lastname: "Obodo",
          password: "mynigga"
        };
        const result = await userStore.create(newUser);
        expect(result).toBeDefined();
      });


  it("should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });
  it("index method should return a list of Orders",async () => {
    const result = await orderStore.index("1");
    expect(result).toEqual([]);
  });
  
  
  it("should have an create method", () => {
    expect(orderStore.create).toBeDefined();
  });
  it("should create a new Order", async () => {
    const myOrder: Order = {
      product_id: "1",
      quantity: 2,
      user_id: "1",
      status: "active"
    };
    const result = await orderStore.create(myOrder);
    expect(result).toEqual({
        id: 1,
        product_id: "1",
        quantity: 2,
        user_id: "1",
        status: "active"
    });
  });


  it("should have an show method", () => {
    expect(orderStore.show).toBeDefined();
  });
  it("should show an order", async () => {
    const result = await orderStore.show(1, 1);
    const myOrder: Order = {
      id: 1,
      product_id: "1",
      quantity: 2,
      user_id: "1",
      status: "active"
    }
    expect(result).toEqual([myOrder])
  })


  it("should have an completeOrder method", () => {
    expect(orderStore.completeOrder).toBeDefined();
  });
  it("should change order status to complete", async () => {
    const result = await orderStore.completeOrder("complete", 1, 1);
    const myOrder: Order = {
      id: 1,
      product_id: "1",
      quantity: 2,
      user_id: "1",
      status: "complete"
    }
    expect(result).toEqual(myOrder)
  })
  
  
  it("should have a delete method", () => {
    expect(orderStore.delete).toBeDefined();
  });
  it("should delete an order",async () => {
    orderStore.delete(1, 1);
    const result = await orderStore.index("1");
    expect(result).toEqual([]);
  });


  it("should delete a user", async () => {
    await userStore.delete(1);
    const result = await userStore.index();
    expect(result).toEqual([]);
  });
});