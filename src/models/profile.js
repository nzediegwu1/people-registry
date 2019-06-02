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
    instagram: String,
    linkedIn: String,
    occupation: String,
    gender: { ...requiredString, enum: ['male', 'female'] },
    bio: String,
    imageUrl: String,
    imagePublicId: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('profile', Profile);
