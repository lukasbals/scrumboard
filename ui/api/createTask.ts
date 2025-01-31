import { message } from 'antd';
import Task from '../models/Task';

const createTask = async (task: Task, boardName: string): Promise<Task> => {
  message.info('Saving task ...');
  const response = await fetch(
    `/api/boards/${boardName}/stories/${task.storyId}/tasks`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }
  );
  message.destroy();
  if (response.status === 202) {
    const task = await response.json();
    message.success('Task saved!');
    return task;
  }
  message.error(
    'Some error occurred while creating your task. Please try again.'
  );
  return null;
};

export default createTask;
