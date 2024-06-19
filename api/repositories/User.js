import pool from "../db.js";

class UserRepository {
  static async createUser({ userName, hashedPassword }) {
    const today = await pool.query("SELECT NOW()")
    const response = await pool.query(
      "UPDATE Parents SET REGISTER_DATE = (SELECT NOW()), PASSWORD = $1 WHERE PHONE_NUMBER = $2 RETURNING *",
      [ hashedPassword, userName]
    );

    return response.rows[0];
  }

  static async getUserData(userName) {
    const response = await pool.query("SELECT * FROM Parents WHERE PHONE_NUMBER=$1 AND REGISTER_DATE IS NOT NULL", [
      userName,
    ]);
    if (!response.rows.length) {
      return null;
    }
    
    return response.rows[0];
  }
}

export default UserRepository;
