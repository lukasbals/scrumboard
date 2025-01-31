import { message } from 'antd';
import Task from '../models/Task';

const updateTask = async (
  task: Task,
  boardName: string,
  muted = false
): Promise<Task> => {
  !muted && message.info('Updating task ...');
  const response = await fetch(
    `/api/boards/${boardName}/stories/${task.storyId}/tasks/${task.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }
  );
  message.destroy();
  if (response.status === 200) {
    const task = await response.json();
    !muted && message.success('Task updated!');
    return task;
  }
  message.error(
    'Some error occurred while updating your task. Please try again.'
  );
  return null;
};

export default updateTask;
