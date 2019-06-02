export const response = (res, code, message, data = {}) => res.status(code).json({ message, data });
export const existsOr404 = (res, data, resource) => {
  if (!data) {
    return response(res, 404, `${resource} does not exist`);
  }
  return response(res, 200, 'Successful', data);
};
