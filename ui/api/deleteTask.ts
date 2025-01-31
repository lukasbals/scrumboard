import { message } from 'antd';
import Task from '../models/Task';

const deleteTask = async (task: Task, boardName: string): Promise<void> => {
  message.info('Deleting task ...');
  const response = await fetch(
    `/api/boards/${boardName}/stories/${task.storyId}/tasks/${task.id}`,
    {
      method: 'DELETE',
    }
  );
  message.destroy();
  if (response.status === 200) {
    message.success('Task deleted!');
    return;
  }
  message.error(
    'Some error occurred while deleting your task. Please try again.'
  );
};

export default deleteTask;
