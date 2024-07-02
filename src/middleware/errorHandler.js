const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({ status: statusCode, error: message });
};

module.exports = { errorHandler };
