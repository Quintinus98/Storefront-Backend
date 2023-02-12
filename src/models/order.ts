import Client from "../database";


export type Order = {
    id?: number,
    product_id: string,
    quantity: number,
    user_id: string,
    status: string
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
    
  async show (id: number, user_id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = $1 AND user_id = $2";
      const result = await conn.query(sql, [id, user_id]);
    
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("User must be authorized.");
    }
  }

  async create (o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create an order. ${error}`);
    }
  }

  async completeOrder (status: string, id: number, user_id: number): Promise<Order> {
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

  async delete(id: number, user_id: number): Promise<string> {
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