import mongoose from 'mongoose';

const requiredString = { type: String, required: true };

const Profile = new mongoose.Schema(
  {
    email: { ...requiredString, unique: true },
    fullname: requiredString,
    address: String,
    phone: { ...requiredString, unique: true },
    facebook: String,
    twitter: String,
    linkedIn: String,
    occupation: String,
    gender: { type: String, enum: ['male', 'female'] },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('profile', Profile);
