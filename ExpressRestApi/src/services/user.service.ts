import { getById, getAll } from '../repositories/user.repository';

export const verifyUser = async (userId:string) => {
  const user = await getById(userId);

  return !!user;
}

export const getUsers = async () => {
  const users = await getAll();

  return users;
}