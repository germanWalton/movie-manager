/** @format */

import * as mongoose from 'mongoose';
const unixTime = () => parseInt(Math.floor(Date.now() / 1000) + '');

export const UserSchema = new mongoose.Schema(
  {
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: true, unique: true },
    role: { type: String },
    created_at: {
      type: Number,
      default: unixTime(),
    },
    updated_at: {
      type: Number,
      default: unixTime(),
    },
  },
  { collection: 'user' },
);

UserSchema.pre('save', function (next) {
  this.updated_at = unixTime();
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  this.updateOne({}, { $set: { updated_at: unixTime() } });
  next();
});
