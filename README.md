const generator = new QueryGenerator();

generator.paginationFn(params);

generator.filterFn(params, keys);

generator.dateFilterFn(params);

// console.log(
//   `QUERY = ${generator.filterFn(params, keys)} ${
//     generator.filterFn(params, keys).includes("WHERE")
//       ?'AND '+ generator.dateFilterFn(params)
//       : "WHERE " + generator.dateFilterFn(params)
//   } ${generator.paginationFn(params)}`
// );


<!-- Role Exists Resolver -->

  roleExists.then((response) => {
    if (response.status) {
    
    } else {
      res.status(500).json(response.response);
    }
  })