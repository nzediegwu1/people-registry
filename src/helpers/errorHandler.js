/* eslint-disable import/prefer-default-export */
import cloudinary from 'cloudinary';
import { response } from '../helpers/controllerUtils';

export const helmet = resolver => async (req, res) => {
  try {
    return await resolver(req, res);
  } catch ({ message }) {
    const { body } = req;
    const imagePublicId = body && body.imagePublicId;
    if (imagePublicId) cloudinary.v2.uploader.destroy(imagePublicId);
    return response(res, 500, message);
  }
};
