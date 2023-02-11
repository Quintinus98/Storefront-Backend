import Client from "../database";

export interface productOrders {
    name: string,
    price: number,
    order_id: string
}

export class DashboardQueries {
    async productsInOrders(): Promise<productOrders[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.id";
            const result = await conn.query(sql);

            conn.release();
    
            return result.rows;
        } catch (error) {
            throw new Error("Unable to get products in order.");
        }
    }

    async usersWithOrders(): Promise<{firstname: "string", lastname: "string"}[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.user_id";
            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error("Unable to fetch users with orders.");
            
        }
    }
}

