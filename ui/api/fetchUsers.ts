import { message } from 'antd';
import User from '../models/User';

const fetchUsers = async (boardName: string): Promise<User[]> => {
  const response = await fetch(`/api/boards/${boardName}/users`);
  if (response.status === 200) {
    return await response.json();
  }
  message.error(
    'Some error occurred while fetching your boards users. Please try again.'
  );
  return null;
};

export default fetchUsers;
