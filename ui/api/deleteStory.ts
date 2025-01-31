import { message } from 'antd';

const deleteStory = async (
  storyId: string,
  boardName: string
): Promise<void> => {
  message.info('Deleting story ...');
  const response = await fetch(`/api/boards/${boardName}/stories/${storyId}`, {
    method: 'DELETE',
  });
  message.destroy();
  if (response.status === 200) {
    message.success('Story deleted!');
    return;
  }
  message.error(
    'Some error occurred while deleting your story. Please try again.'
  );
};

export default deleteStory;
