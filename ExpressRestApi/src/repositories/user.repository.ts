import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../schema/types/user.entity';
import { DI } from '../index';
import { QueryOrder } from '@mikro-orm/core';

export const getById = async (userId: string) => {
  //return users.find(user => user.id === userId);
  const user = await DI.userRepository.findOne({
    id: userId
  });

  return user;
}

export const getAll = async () => {
  const users = await DI.userRepository.findAll({
    orderBy: {name: QueryOrder.DESC},
    limit: 20,
  });

  return users;
}

const users: UserEntity[] = [
  {
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
  },
  {
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
  }
];