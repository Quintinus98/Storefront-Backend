import Client from "../database";

export type Order = {
    id?: number,
    status: string,
    user_id: number
}

export type orderProducts = {
    id?: number,
    quantity: number,
    orderId: string,
    productId: string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
            
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Order with ${id} does not exist. ${error}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {      
      const conn = await Client.connect();
      const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create an order. ${error}`);
    }
  }

  async addProduct(orderProduct: orderProducts): Promise<Order> {
    try {      
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      const result = await conn.query(sql, [orderProduct.orderId]);
      const order = result.rows[0];

      if (order.status !== "active" ) {
        throw new Error("Cannot add products to this order, order is not active.");
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }
    try {      
      const conn = await Client.connect();
      const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [orderProduct.quantity, orderProduct.orderId, orderProduct.productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add product(s) to order. ${error}`);
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      await conn.query(sql, [id]);
      conn.release();
      return "Deleted successfully!";
    } catch (error) {
      throw new Error(`Could not delete order ${id}. ${error}`);
            
    }
  }
}
