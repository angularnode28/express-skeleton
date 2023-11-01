const moment = require("moment/moment");

function checkNull(data) {
  return data != undefined && data != null && data != "";
}

class QueryGenerator {
  constructor() {}

  paginationFn(params) {
    let query = "";

    // for Sorting
    if (checkNull(params.sortBy)) {
      query += ` ORDER BY ${params.sortBy}`;
    }
    // for type of Sorting
    const sorts = ["DESC", "ASC"];
    if (
      checkNull(params.sortByKey) &&
      sorts.includes(params.sortByKey.toUpperCase())
    ) {
      query += ` ${params.sortByKey.toUpperCase()}`;
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
    console.log(query);
    return query;
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
    console.log(query);
    return query;
  }

  dateFilterFn(params) {
    const { fromDate, toDate } = params;
    let query = "";
    if (checkNull(fromDate)) {
      query += ` created_at BETWEEN '${formatDate(fromDate)}' AND '${
        checkNull(toDate) ? formatDate(toDate) : formatDate(Date.now())
      }'`;
    }

    function formatDate(date) {
      return moment(date).format("yyyy-MM-DD");
    }

    return query;
  }
}

module.exports = { QueryGenerator };
