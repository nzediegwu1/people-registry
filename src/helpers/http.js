const error = 'An error occured';

export const response = ({ res, code = 200, message = error, data, errors }) =>
  res.status(code).json({ message, data, errors });

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const existsOr404 = (data, message) => {
  if (!data) {
    throw new CustomError(message, 404);
  }
};

const resolve = action => async (req, res) => {
  try {
    return await action(req, res);
  } catch ({ message, code }) {
    return response({ res, code: code || 500, errors: [message] });
  }
};

export const resolver = controller =>
  Object.entries(controller).reduce((result, [key, value]) => {
    result[key] = resolve(value);
    return result;
  }, {});
