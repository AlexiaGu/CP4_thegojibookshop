const AbstractManager = require("./AbstractManager");

// AbstractManager = parent et ReaderManager et BookManager = enfant
// qui hérite des propriétés du parent

class ReaderManager extends AbstractManager {
  constructor() {
    super({ table: "reader" });
  }

  async create(readerInfos) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, username) values (?,?,?)`,
      [readerInfos.email, readerInfos.password, readerInfos.username]
    );
    return result;
  }

  // /!\ select * from user est interdit car l'on ne souahite pas voir le mdp même en hashé apparaître

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

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} where email = ?`,
      [email]
    );
    return rows;
  }
}

module.exports = ReaderManager;
