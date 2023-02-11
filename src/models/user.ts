import bcrypt from "bcrypt";
import Client from "../database";


declare let process: {
  env: {
    [key: string]: string;
  }
};

export type user = {
  id?: number,
  firstname: string,
  lastname: string,
  username: string, 
  password: string,
}

export class UserStore {
  async index(): Promise<user[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(id: number): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`User not found. ${error}`);
    }
  }
  async create(u: user): Promise<user> {
    try { 
      const conn = await Client.connect();
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const sql = "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *";

      const hash = bcrypt.hashSync(u.password + process.env.BCRYPT_PASSWORD, saltRounds);
      
      const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash]);
      const newUser = result.rows[0];
      conn.release();

      return newUser;
    } catch (error) {
      throw new Error(`Could not add new user. ${error}`);
    }
  }
  
  async update(u: user, id: string): Promise<user> {
    try { 
      const conn = await Client.connect();
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const sql = "UPDATE users SET firstname = $1, lastname = $2, username = $3, password = $4 WHERE id = $5 RETURNING *";

      const hash = bcrypt.hashSync(u.password + process.env.BCRYPT_PASSWORD, saltRounds);
      
      const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash, id]);
      const updatedUser = result.rows[0];
      conn.release();

      return updatedUser;
    } catch (error) {
      throw new Error(`Could not update user. ${error}`);
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      await conn.query(sql, [id]);
      conn.release();
      
      return "Deleted successfully!";
    } catch (error) {
      throw new Error(`Could not delete user ${id}. ${error}`);
            
    }
  }
  async authenticate (u: {username: string, password: string}) {
    const conn = await Client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";
    const result = await conn.query(sql, [u.username]);

    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);
      
      if (bcrypt.compareSync(u.password + process.env.BCRYPT_PASSWORD, user.password)) {
        return user;
      }
    }
    return null;
  }
}