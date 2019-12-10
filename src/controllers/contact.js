import Contact from '../models/contact';
import { existsOr404, response, resolver } from '../helpers/http';
import { contacts } from '../messages/success';
import { user } from '../messages/error';

const UserContact = {
  async get(req, res) {
    const { params } = req;
    const data = await Contact.findOne({ _id: params.id });
    existsOr404(res, data, 'Contact');
    return response({ res, message: contacts.retrieved, data });
  },
  async getAll(req, res) {
    const data = await Contact.find({}).sort('-updatedAt');
    return response({ res, message: contacts.fetched, data });
  },
  async create(req, res) {
    const { body } = req;
    const contact = await Contact.findOne({
      $or: [{ email: body.email }, { phone: body.phone }],
    });
    if (contact) {
      const message = user.alreadyExists;
      return response({ res, code: 409, message });
    }
    const data = await Contact.create(body);
    return response({ res, message: contacts.created, data });
  },
  async update(req, res) {
    const { body, params } = req;
    const contact = await Contact.findOne({
      _id: { $ne: params.id },
      $or: [{ email: body.email }, { phone: body.phone }],
    });
    if (contact) {
      const message = user.alreadyExists;
      return response({ res, code: 409, message });
    }
    const data = await Contact.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    existsOr404(res, data, 'Contact');
    const message = contacts.updated;
    return response({ res, message, data });
  },

  async delete(req, res) {
    const { params } = req;
    const data = await Contact.findByIdAndDelete(params.id);
    existsOr404(data, 'Contact');
    const message = contacts.deleted;
    return response({ res, message });
  },
};

export default resolver(UserContact);
