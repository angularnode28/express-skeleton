// INSERT INTO `tgss_admin_panel`.`roles` (`role_name`) VALUES ('assistant manager');
// INSERT INTO `tgss_admin_panel`.`roles` (`role_name`, `status`) VALUES ('pune', '0');
class CreateQueryGenerator {
  values;
  keys;
  name;
  query;
  constructor(req, tableName, tableKeys) {
    this.values = req.body;
    this.keys = tableKeys;
    this.name = tableName;

    // this.query = `INSERT INTO ${this.name} `;
  }

  queryNames() {
    let query = ``;

    this.keys.filter((ele, inx) => {
      switch (true) {
        case inx == 0:
          query += `'${ele}'`;
          break;
        case inx + 1 != this.keys.length:
          query += `, '${ele}'`;
          break;
        case inx + 1 == this.keys.length:
          query += `, '${ele}'`;
          break;
      }
    });

    return query;
  }

  queryValues() {
    let query = ``;

    this.keys.filter((ele, inx) => {
      switch (true) {
        case inx == 0:
          query += `'${this.values[ele]}'`;
          break;
        case inx + 1 != this.keys.length:
          query += `,'${this.values[ele]}'`;
          break;
        case inx + 1 == this.keys.length:
          query += `,'${this.values[ele]}'`;
          break;
      }
    });

    return query;
  }

  getQuery() {
    const queryName = this.queryNames();
    const queryValues = this.queryValues();

    return `INSERT INTO ${this.name} (${queryName}) VALUES (${queryValues})`;
  }
}

module.exports = CreateQueryGenerator;
