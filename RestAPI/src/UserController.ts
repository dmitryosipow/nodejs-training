import { v4 as uuidv4 } from 'uuid';
import { User } from './types';
import { getUsers } from './Database';

export class UserController {
  create(data: Omit<User, 'id'>) {
    const user = {
      id: uuidv4(),
      ...data
    }

    getUsers().push(user);

    return user;
  }

  delete(id:string) {
    const users = getUsers();

    const ind = users.findIndex(user => user.id === id);
    if (ind) {
      users.splice(ind, 1);
      return true;
    }

    throw new Error('No such user found');
  }

  update(id:string, data: Omit<User, 'id'>) {
    const users = getUsers();

    const ind = users.findIndex(user => user.id === id);
    if (ind) {
      users[ind] = { ...users[ind], ...data };
      return true;
    }

    throw new Error('No such user found');
  }

  getAll() {
    return getUsers().map(({hobbies, ...rest}) => rest);
  }

  getById(id: string) {
    const users = getUsers();

    const user = users.find(user => user.id === id);

    if (!user) {
      throw new Error('No such user found');
    }

    const { hobbies, ...rest } = user;
    return rest;
  }
}