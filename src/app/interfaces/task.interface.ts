import { User } from './user.interface';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  isDone: boolean;
  priority: number;
  dueDate: Date;
}
