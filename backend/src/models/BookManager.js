const AbstractManager = require("./AbstractManager");

// ici logique des requêtes SQL

class BookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  async create(book) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (title, author, summary) VALUES (?, ?, ?)`,
      [book.title, book.author, book.summary]
    );
    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(book) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET title=?, author =?, summary=? WHERE id=?`,
      [book.title, book.author, book.summary, book.id]
    );
    return rows;
  }

  async destroy(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows;
  }
}

module.exports = BookManager;
