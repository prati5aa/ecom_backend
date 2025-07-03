const handleError = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  let errors = [];
  let msg = "";

  if (err.name === "ValidationError") {
    status = 400;

    // For Joi-style validation errors (with .details)
    if (err.details) {
      // Compose message from details
      message = err.details.map(el => `${el.path} is required`).join(", ");
      msg = "Validation Error";
    }

    // For Mongoose validation errors (with .errors)
    else if (err.errors) {
      msg = "Bad Request / Validation Error";
      // Convert error objects to array with field and message
      errors = Object.entries(err.errors).map(([field, errorObj]) => ({
        field,
        msg: errorObj.message,
      }));
      message = msg;
    }

      // Mongo duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    status = 409; // Conflict
    // err.keyValue contains the duplicated field info
    const fields = Object.keys(err.keyValue).join(", ");
    message = `Duplicate key error: ${fields} already exists.`;
    return res.status(status).send({
      status: "fail",
      message,
      duplicatedFields: err.keyValue,
    });
  }

    return res.status(status).send({
      msg,
      message,
      errors,
    });
  }

  // Default handler for other errors
  return res.status(status).send({
    message,
    error: err.message || err,
  });
};

module.exports = {
  handleError,
};
