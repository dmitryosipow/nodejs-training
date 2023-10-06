import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../schema/types/user.entity';

export const getById = (userId: string) => {
  return users.find(user => user.id === userId);
}

const users: UserEntity[] = [
  {
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
  },
  {
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
  }
];