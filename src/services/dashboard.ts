import Client from "../database";
import { Order } from "../models/order";

export class DashboardQueries {

  async completedOrders(user_id: string, status: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = '${status}'`;
      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error("Unable to fetch completed orders.");
    }
  }
}