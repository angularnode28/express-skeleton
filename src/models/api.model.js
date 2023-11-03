const { checkNull } = require("../configs/common");

class Success {
  status;
  keyword;
  message;
  data;
  count;
  constructor(status, keyword, message, data) {
    this.status = status;
    this.keyword = keyword;
    this.message = message;
    if (checkNull(data)) {
      this.data = data;
    }
    this.count = Array.isArray(data) ? data.length : "";
  }
}

class Failure {
  status;
  keyword;
  message;
  error;

  constructor(status, keyword, message, error) {
    this.status = status;
    this.keyword = keyword;
    // this.error = error;
    this.message = message;

    this.setMessage(error);
  }

  setMessage(err) {
    switch (true) {
      case err.code == "ER_DUP_ENTRY" || err?.errno == 1062:
        this.message = duplicateMessage(err);
        break;
      default:
        checkNull(err) ? (this.error = err) : "";
        break;
    }
  }
}

function duplicateMessage(error) {
  const msg = error?.sqlMessage;
  let str = msg.split(".").pop();
  const key = str.split("_UNIQUE")[0];
  return `${key} already exists!`;
}

module.exports = { Success, Failure };
