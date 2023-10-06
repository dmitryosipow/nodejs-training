import { getById } from '../repositories/user.repository';

export const verifyUser = (userId:string) => {
  const user = getById(userId);

  return !!user;
}