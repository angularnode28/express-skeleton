// UPDATE `tgss_admin_panel`.`roles` SET `role_name` = 'Sale engineers', `status` = '1', `updated_at` = '2023-11-03 12:38:47',
//  `created_at` = '2023-11-03 12:38:47' WHERE (`roleId` = '14');
class UpdateQueryGenerator {
  values;
  keys;
  name;
  query;
  pathKey;
  id;

  constructor(req, tableName, pathKey, tableKeys) {
    this.values = req.body;
    this.keys = tableKeys;
    this.name = tableName;
    this.pathKey = pathKey;
    this.id = req.params[pathKey];
    // this.query = `INSERT INTO ${this.name} `;
  }

  queryNames() {
    let query = ``;


    this.keys.filter((ele, inx) => {
        console.log(this.values[ele],ele)
      switch (true) {
        case inx == 0:
          query += `${ele}= '${this.values[ele]}'`;
          break;
        case inx + 1 != this.keys.length:
          query += `,${ele}= '${this.values[ele]}`;
          break;
        case inx + 1 == this.keys.length:
          query += `, ${ele}= '${this.values[ele]}`;
          break;
      }
    });

    return query
  }

  getQuery() {
    let queryName = this.queryNames();
console.log(queryName);

    return `UPDATE ${this.name} SET ${queryName} WHERE ${this.pathKey}= '${this.id}' `;
  }
}

module.exports = UpdateQueryGenerator;
