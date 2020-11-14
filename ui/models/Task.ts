import { TODO, IN_PROGRESS, VERIFY, DONE } from '../../constants';

type Task = {
  description: string;
  type: TODO | IN_PROGRESS | VERIFY | DONE;
  user: {
    name: string;
    color: string;
  };
};

export default Task;
