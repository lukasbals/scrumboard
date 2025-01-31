import { message } from 'antd';
import Story from '../models/Story';

const fetchStories = async (boardName: string): Promise<Story[]> => {
  const response = await fetch(`/api/boards/${boardName}/stories`);
  if (response.status === 200) {
    return await response.json();
  }
  message.error(
    'Some error occurred while fetching your stories. Please try again.'
  );
  return null;
};

export default fetchStories;
