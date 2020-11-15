import { message } from 'antd';
import Story from '../models/Story';

const updateStory = async (story: Story): Promise<Story> => {
  message.info('Updating story ...');
  const response = await fetch(
    `/api/boards/${story.boardName}/stories/${story.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story),
    },
  );
  message.destroy();
  if (response.status === 200) {
    const story = await response.json();
    message.success('Story updated!');
    return story;
  }
  message.error(
    'Some error occurred while creating your story. Please try again.',
  );
  return null;
};

export default updateStory;
