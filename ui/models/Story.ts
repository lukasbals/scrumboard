import Task from './Task';

type Story = {
  id: string;
  name: string;
  boardName: string;
  link: string;
  new?: boolean;
  tasks: Task[];
};

export default Story;
