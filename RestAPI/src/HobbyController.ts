import { v4 as uuidv4 } from 'uuid';
import { User } from './types';
import { getUsers } from './Database';

export class HobbyController {
  get(id: string) {
    const users = getUsers();
    const user = users.find(user => user.id === id);

    if (user) {
      return user.hobbies;
    }

    throw new Error('No user has been found with such id')
  }

  add(id: string, hobby: string) {
    const users = getUsers();

    const user = users.find(user => user.id === id);

    if (user) {
      user.hobbies.push(hobby);
      return user;
    }

    throw new Error('No user has been found with such id')
  }

  update(id: string, newHobbies: string[]) {
    const users = getUsers();

    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error('No user has been found with such id')
    }

    const updatedHobbies = new Set([...user.hobbies, ...newHobbies]);
    user.hobbies = Array.from(updatedHobbies);

    return user;
  }

  delete(id: string, hobbyParam: string) {
    const users = getUsers();

    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error('No user has been found with such id')
    }

    const ind = user.hobbies.findIndex(hobby => hobby === hobbyParam);
    if (ind === -1) {
      throw new Error('Hobby wasn\'t found in the list')
    }
    if (ind > -1) {
      user.hobbies.splice(ind, 1);
      return user;
    }
  }

  getAll() {
    return getUsers().map(({hobbies, ...rest}) => rest);
  }
}