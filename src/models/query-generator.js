const moment = require("moment/moment");

function checkNull(data) {
  return data != undefined && data != null && data != "";
}

class QueryGenerator {
  params;
  keys;
  name;
  tableKeys;

  constructor(req, paramKeys, tableName, tableKeys) {
    this.params = req.query;
    this.keys = paramKeys;
    this.name = tableName;
    this.tableKeys = tableKeys;
  }

  filterFn(params, keys) {
    let query = "";

    keys.filter((ele, inx) => {
      switch (true) {
        // case 1
        case inx == 0 && checkNull(params[ele]):
          query += ` WHERE ${ele}=${params[ele]}`;
          break;

        // case 2

        case inx != 0 && !query.includes("WHERE") && checkNull(params[ele]):
          query += ` WHERE ${ele}=${params[ele]}`;
          break;

        // case 3

        case inx != 0 && query.includes("WHERE") && checkNull(params[ele]):
          query += ` AND ${ele}=${params[ele]}`;
          break;
      }
    });
    return query;
  }

  dateFilterFn(params) {
    const { fromDate, toDate } = params;
    let query = "";
    if (checkNull(fromDate)) {
      query += ` created_at BETWEEN '${formatDate(fromDate ?? "1980-01-01")}' AND '${
        checkNull(toDate) ? toDateFormat(toDate) : formatDate(Date.now())
      }'`;
    }

    function formatDate(date) {
      return moment(date).format("yyyy-MM-DD HH:mm");
    }

    function toDateFormat(date) {
      const d1 = moment(date).format("yyyy-MM-DD");
      const d2 = moment(Date.now()).format("yyyy-MM-DD");
      if (d1 == d2) {
        return moment(Date.now()).format("yyyy-MM-DD HH:mm");
      } else {
        return moment(date).format("yyyy-MM-DD HH:mm");
      }
    }

    return query;
  }

  paginationFn(params) {
    let query = "";
    console.log(params);

    // for Sorting
    if (checkNull(params.sortByKey)) {
      query += ` ORDER BY ${params.sortByKey}`;
    }
    // for type of Sorting
    const sorts = ["DESC", "ASC"];
    if (
      checkNull(params.sortBy) &&
      sorts.includes(params.sortBy.toUpperCase()) &&
      checkNull(params.sortByKey)
    ) {
      query += ` ${params.sortBy.toUpperCase()}`;
    }
    //   for Limit
    if (checkNull(params.limit)) {
      query += ` LIMIT ${params.limit}`;
    } else {
      query += ` LIMIT 10`;
    }

    // for Offset
    if (params.offset > 0) {
      query += ` OFFSET ${
        params.offset * (checkNull(params.limit) ? params.limit : 10)
      }`;
    } else {
      query += ` OFFSET 0`;
    }
    return query;
  }

  searchFn(params, keys) {
    console.log(params, keys);
    let query = "";

    if (checkNull(params.searchWith) && keys.length > 0) {
      keys.filter((ele, inx) => {
        switch (true) {
          case inx == 0 || inx + 1 == keys.length:
            query += `${ele} LIKE '%${params.searchWith}%' `;
            break;
          case inx + 1 != keys.length:
            `OR ${ele} LIKE '%${params.searchWith}%' `;
          default:
            break;
        }
      });
    }

    return query ?? "";
  }

  getQuery() {
    const fieldFilter = this.filterFn(this.params, this.keys);
    const dateFilter = this.dateFilterFn(this.params);
    const searchFilter = this.searchFn(this.params, this.tableKeys);
    const pagination = this.paginationFn(this.params);

    let query = `SELECT * FROM ${this.name} `;

    if (checkNull(fieldFilter)) {
      query += `${fieldFilter} `;
    }

    if (checkNull(searchFilter)) {
      switch (true) {
        case query.includes("WHERE"):
          query += `AND ${searchFilter} `;
          break;
        case !query.includes("WHERE") && checkNull(searchFilter):
          query += `WHERE ${searchFilter} `;
          break;
        default:
          break;
      }
    }

    if (checkNull(dateFilter)) {
      switch (true) {
        case query.includes("WHERE"):
          query += `AND ${dateFilter} `;
          break;
        case !query.includes("WHERE") && checkNull(dateFilter):
          query += `WHERE ${dateFilter} `;
          break;
        default:
          break;
      }
    }

    if (checkNull(pagination)) {
      query += pagination;
    }

    console.log(query);

    return query;
  }
}
module.exports = { QueryGenerator };

/**
 * `SELECT * FROM ${this.name} ${this.filterFn(this.params, this.keys)} ${
      this.filterFn(this.params, ["status"]).includes("WHERE")
        ? this.dateFilterFn(this.params)
        : checkNull(this.dateFilterFn(this.params))
        ? "WHERE " + this.dateFilterFn(this.params)
        : ""
    } ${this.paginationFn(this.params)}`;
  }
 */
