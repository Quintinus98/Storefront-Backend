import Client from "../database";


export type Order = {
    id?: number,
    user_id: string,
    status: string
}

export type orderProducts = {
  id?: number,
  quantity: number,
  order_id: number,
  product_id: number
}

export class OrderStore {
  async index (user_id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const result = await conn.query(sql, [user_id]);
    
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("User must be authorized.");
    }
  }
    
  async show (id: number, user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = $1 AND user_id = $2";
      const result = await conn.query(sql, [id, user_id]);
    
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("User must be authorized.");
    }
  }

  async create (o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create an order. ${error}`);
    }
  }

  async completeOrder (status: string, id: number, user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "UPDATE orders SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *";
      const result = await conn.query(sql, [status, id, user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not complete order. ${error}`);
            
    }
  }

  async addProduct(op: orderProducts, user_id: string): Promise<Order> {
    try {      
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1) AND user_id = $2";
      const result = await conn.query(sql, [op.order_id, user_id]);
      const order = result.rows[0];
      conn.release();

      // Doesn't output to postman body - why?
      if (order.status !== "active" ) {
        throw new Error("Cannot add products to this order, order is not active.");
      }
      if(!order) {
        throw new Error("Cannot verify user or order");
      }
    } catch (error) {      
      throw new Error(`${error}`);
    }

    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id]);
      conn.release();
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add product(s) to order. ${error}`);
    }
  }

  async delete(id: number, user_id: string): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=$1 AND user_id = $2";
      await conn.query(sql, [id, user_id]);
      conn.release();
          
      return "Deleted successfully!";
    } catch (error) {
      throw new Error(`Could not delete order ${id}. ${error}`);
                
    }
  }
}