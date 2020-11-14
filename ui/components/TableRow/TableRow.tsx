import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DONE, IN_PROGRESS, TODO, VERIFY } from '../../../constants';
import Story from '../../models/Story';
import Task from '../../models/Task';
import StoryCard from '../StoryCard';
import TaskCard from '../TaskCard';
import styles from './styles.module.scss';

type CollectReturnType = {
  isOver: boolean;
  canDrop: boolean;
};

type PropTypes = {
  story: Story;
};

const TableRow = ({ story }: PropTypes): JSX.Element => {
  const collect = (monitor: DropTargetMonitor): CollectReturnType => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  });

  const onDropTodo = (item: Task, monitor: DropTargetMonitor): void => {
    console.log('Todo drop: ', item, monitor);
  };

  const onDropInProgress = (item: Task, monitor: DropTargetMonitor): void => {
    console.log('InProgress drop: ', item, monitor);
  };

  const onDropVerify = (item: Task, monitor: DropTargetMonitor): void => {
    console.log('Verify drop: ', item, monitor);
  };

  const onDropDone = (item: Task, monitor: DropTargetMonitor): void => {
    console.log('Done drop: ', item, monitor);
  };

  const [{ isOver: isOverTodo, canDrop: canDropTodo }, dropTodo] = useDrop({
    accept: [IN_PROGRESS, VERIFY, DONE],
    drop: onDropTodo,
    collect,
  });

  const [
    { isOver: isOverInProgress, canDrop: canDropInProgress },
    dropInProgress,
  ] = useDrop({
    accept: [TODO, VERIFY, DONE],
    drop: onDropInProgress,
    collect,
  });

  const [
    { isOver: isOverVerify, canDrop: canDropVerify },
    dropVerify,
  ] = useDrop({
    accept: [TODO, IN_PROGRESS, DONE],
    drop: onDropVerify,
    collect,
  });

  const [{ isOver: isOverDone, canDrop: canDropDone }, dropDone] = useDrop({
    accept: [TODO, IN_PROGRESS, VERIFY],
    drop: onDropDone,
    collect,
  });

  const defaultBackgroundColor = '#ffffff';
  const dropBackgroundColor = '#c2ee9c';
  const canDropBackgroundColor = '#eeeeee';
  const backgroundColors = {
    todo: defaultBackgroundColor,
    inProgress: defaultBackgroundColor,
    verify: defaultBackgroundColor,
    done: defaultBackgroundColor,
  };
  if (isOverTodo && canDropTodo) {
    backgroundColors.todo = dropBackgroundColor;
  } else if (canDropTodo) {
    backgroundColors.todo = canDropBackgroundColor;
  }
  if (isOverInProgress && canDropInProgress) {
    backgroundColors.inProgress = dropBackgroundColor;
  } else if (canDropInProgress) {
    backgroundColors.inProgress = canDropBackgroundColor;
  }
  if (isOverVerify && canDropVerify) {
    backgroundColors.verify = dropBackgroundColor;
  } else if (canDropVerify) {
    backgroundColors.verify = canDropBackgroundColor;
  }
  if (isOverDone && canDropDone) {
    backgroundColors.done = dropBackgroundColor;
  } else if (canDropDone) {
    backgroundColors.done = canDropBackgroundColor;
  }

  return (
    <tr>
      <td>
        <StoryCard
          story={story}
          onChange={(newStory: Story): void => {
            console.log('Edit: ', newStory);
          }}
          onDelete={(newStory: Story): void =>
            console.log('Delete: ', newStory)
          }
        />
      </td>
      <td
        ref={dropTodo}
        style={{ backgroundColor: backgroundColors.todo }}
        className={styles.tableRow}
      ></td>
      <td
        ref={dropInProgress}
        style={{ backgroundColor: backgroundColors.inProgress }}
        className={styles.tableRow}
      ></td>
      <td
        ref={dropVerify}
        style={{ backgroundColor: backgroundColors.verify }}
        className={styles.tableRow}
      ></td>
      <td
        ref={dropDone}
        style={{ backgroundColor: backgroundColors.done }}
        className={styles.tableRow}
      >
        <div className={styles.tdContainer}>
          <TaskCard
            task={{
              description: 'Task 1',
              user: { name: 'Lukas', color: '#5faaa6' },
              type: DONE,
            }}
            onChange={(task): void => console.log('On change: ', task)}
            onDelete={(task): void => console.log('On delete: ', task)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
