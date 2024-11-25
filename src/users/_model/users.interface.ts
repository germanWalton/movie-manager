/** @format */

import { Document } from 'mongoose';

export interface IUser extends Document {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
