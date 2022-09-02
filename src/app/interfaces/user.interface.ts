import { Task } from './task.interface';

export interface User {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  confirmedAt: Date;
}
