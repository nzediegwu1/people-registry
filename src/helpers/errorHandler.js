/* eslint-disable import/prefer-default-export */
import { response } from '../helpers/controllerUtils';

export const helmet = resolver => async (req, res) => {
  try {
    return await resolver(req, res);
  } catch ({ message }) {
    return response(res, 500, message);
  }
};
