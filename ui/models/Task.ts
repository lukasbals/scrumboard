type Task = {
  id: string;
  description: string;
  state: 'TODO' | 'IN_PROGRESS' | 'VERIFY' | 'DONE';
  type: string;
  username: string;
  usercolor?: string;
  storyId: string;
  new?: boolean;
};

export default Task;
