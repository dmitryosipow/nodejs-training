import { User } from './types';

const users: User[] = [
  {
    id: '1',
    name: 'Ann',
    email: 'ann@google.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: '2',
    name: 'Ben',
    email: 'ben@google.com',
    hobbies: ['series', 'sport'],
  },
];

export const getUsers = () => users;