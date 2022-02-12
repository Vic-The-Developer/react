const setResponse = (
  res,
  status_code,
  success,
  message,
  status,
  errors,
  data
) => {
  return res.status(status_code).json({
    success: success,
    message: message,
    status: status,
    errors: errors,
    data: data,
  });
};

module.exports = {
  setResponse,
};
