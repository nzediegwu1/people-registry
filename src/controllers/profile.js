import Profile from '../models/profile';
import { existsOr404, response } from '../helpers/controllerUtils';
import { profiles } from '../messages/success';
import { helmet } from '../helpers/errorHandler';

class UserProfile {
  get = async (req, res) => {
    const { params } = req;
    const data = await Profile.findOne({ _id: params.id });
    return existsOr404(res, data, 'Profile');
  };
  getAll = async (req, res) => {
    const data = await Profile.find({});
    return response(res, 200, profiles.fetched, data);
  };
  create = async (req, res) => {
    const { body } = req;
    const data = await Profile.create(body);
    return response(res, 200, profiles.created, data);
  };
  update = async (req, res) => {
    const { body, params } = req;
    const data = await Profile.findByIdAndUpdate(params.id, body, { new: true });
    return existsOr404(res, data, 'Profile');
  };

  delete = async (req, res) => {
    const { params } = req;
    const data = await Profile.findByIdAndDelete(params.id);
    return existsOr404(res, data, 'Profile');
  };
}
const profile = new UserProfile();

export default {
  get: helmet(profile.get),
  getAll: helmet(profile.getAll),
  create: helmet(profile.create),
  update: helmet(profile.update),
  delete: helmet(profile.delete),
};
