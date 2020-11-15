type Task = {
  description: string;
  state: 'TODO' | 'IN_PROGRESS' | 'VERIFY' | 'DONE';
  type: string;
  user: {
    name: string;
    color: string;
  };
};

export default Task;
