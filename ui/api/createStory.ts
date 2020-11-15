import { message } from 'antd';
import Story from '../models/Story';

const createStory = async (story: Story): Promise<Story> => {
  message.info('Saving story ...');
  const response = await fetch(`/api/boards/${story.boardName}/stories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(story),
  });
  message.destroy();
  if (response.status === 202) {
    const story = await response.json();
    message.success('Story saved!');
    return story;
  }
  message.error(
    'Some error occurred while creating your story. Please try again.',
  );
  return null;
};

export default createStory;
