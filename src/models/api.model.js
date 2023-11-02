class API {
  status;
  keyword;
  message;
  data;
  count;
  error;
  constructor(status, keyword, message, data,error) {
    this.status = status;
    this.keyword = keyword;
    this.message = message;
    this.data = data;
    this.error = error
    this.count = Array.isArray(data) ? data.length : "";
  }
}


module.exports = API
