import Contact from '../models/contact';
import { existsOr404, response } from '../helpers/controllerUtils';
import { contacts } from '../messages/success';
import { helmet } from '../helpers/errorHandler';

class UserContact {
  get = async (req, res) => {
    const { params } = req;
    const data = await Contact.findOne({ _id: params.id });
    return existsOr404(res, data, 'Contact');
  };
  getAll = async (req, res) => {
    const data = await Contact.find({}).sort('-updatedAt');
    return response(res, 200, contacts.fetched, data);
  };
  create = async (req, res) => {
    const { body } = req;
    const contact = await Contact.findOne({ $or: [{ email: body.email }, { phone: body.phone }] });
    if (contact) return response(res, 409, 'Email or phone number already exists');
    const data = await Contact.create(body);
    return response(res, 200, contacts.created, data);
  };
  update = async (req, res) => {
    const { body, params } = req;
    const data = await Contact.findByIdAndUpdate(params.id, body, { new: true });
    return existsOr404(res, data, 'Contact');
  };

  delete = async (req, res) => {
    const { params } = req;
    const data = await Contact.findByIdAndDelete(params.id);
    return existsOr404(res, data, 'Contact');
  };
}
const contact = new UserContact();

export default {
  get: helmet(contact.get),
  getAll: helmet(contact.getAll),
  create: helmet(contact.create),
  update: helmet(contact.update),
  delete: helmet(contact.delete),
};
