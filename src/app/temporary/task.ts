import { Task } from '../interfaces/task.interface';

export const tasks: Task[] = [
  {
    title: 'do something',
    description: 'You should do something',
    isDone: false,
    priority: 1,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'something new to do',
    description: 'You should do something',
    isDone: true,
    priority: 1,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'do the dishes',
    description: 'You should wash up plates',
    isDone: false,
    priority: 1,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'watch bees',
    description: 'You should do something',
    isDone: false,
    priority: 3,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'something new to do',
    description: 'You should do something',
    isDone: true,
    priority: 1,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'go home',
    description: 'You should do something',
    isDone: false,
    priority: 4,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'study something new to do',
    description: 'You should do something',
    isDone: false,
    priority: 5,
    dueDate: new Date(2022, 4, 1),
  },
  {
    title: 'something new to do',
    description: 'You should do something',
    isDone: false,
    priority: 1,
    dueDate: new Date(2022, 4, 1),
  },
];
