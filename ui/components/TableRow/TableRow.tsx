import { useContext, useRef } from 'react';
import { DropTargetMonitor } from 'react-dnd';
import { todo, inProgress, verify, done } from '../../../constants';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';
import Story from '../../models/Story';
import Task from '../../models/Task';
import StoryCard from '../StoryCard';
import TaskCard from '../TaskCard';
import styles from './styles.module.scss';
import React from 'react';
import { useDrop } from 'react-dnd';

const addTypesToTasks = (tasks, storyId: string): Task[] => {
  return tasks.map((task) => ({ ...task, type: `${task.state}-${storyId}` }));
};

type CollectReturnType = {
  isOver: boolean;
  canDrop: boolean;
};

type PropTypes = {
  story: Story;
};

const TableRow: React.FC<PropTypes> = ({ story }: PropTypes) => {
  const store = useContext(BoardStoreContext);

  const TODO = todo(story.id);
  const IN_PROGRESS = inProgress(story.id);
  const VERIFY = verify(story.id);
  const DONE = done(story.id);

  const collect = (monitor: DropTargetMonitor): CollectReturnType => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  });

  const onDropTodo = (task: Task): void => {
    task.state = 'TODO';
    store.moveTask(task, 'TODO');
  };

  const onDropInProgress = (task: Task): void => {
    task.state = 'IN_PROGRESS';
    store.moveTask(task, 'IN_PROGRESS');
  };

  const onDropVerify = (task: Task): void => {
    task.state = 'VERIFY';
    store.moveTask(task, 'VERIFY');
  };

  const onDropDone = (task: Task): void => {
    task.state = 'DONE';
    store.moveTask(task, 'DONE');
  };

  const [{ isOver: isOverTodo, canDrop: canDropTodo }, dropTodo] = useDrop({
    // accept: [IN_PROGRESS, VERIFY, DONE],
    accept: 'TASK',
    drop: onDropTodo,
    collect,
  });

  const [
    { isOver: isOverInProgress, canDrop: canDropInProgress },
    dropInProgress,
  ] = useDrop({
    // accept: [TODO, VERIFY, DONE],
    accept: 'TASK',
    drop: onDropInProgress,
    collect,
  });

  const [{ isOver: isOverVerify, canDrop: canDropVerify }, dropVerify] =
    useDrop({
      // accept: [TODO, IN_PROGRESS, DONE],
      accept: 'TASK',
      drop: onDropVerify,
      collect,
    });

  const [{ isOver: isOverDone, canDrop: canDropDone }, dropDone] = useDrop({
    // accept: [TODO, IN_PROGRESS, VERIFY],
    accept: 'TASK',
    drop: onDropDone,
    collect,
  });

  const dropTodoRef = useRef<HTMLTableCellElement>(null);
  const dropInProgressRef = useRef<HTMLTableCellElement>(null);
  const dropVerifyRef = useRef<HTMLTableCellElement>(null);
  const dropDoneRef = useRef<HTMLTableCellElement>(null);

  React.useEffect(() => {
    if (dropTodoRef.current) {
      dropTodo(dropTodoRef.current);
    }
    if (dropInProgressRef.current) {
      dropInProgress(dropInProgressRef.current);
    }
    if (dropVerifyRef.current) {
      dropVerify(dropVerifyRef.current);
    }
    if (dropDoneRef.current) {
      dropDone(dropDoneRef.current);
    }
  }, [dropTodo, dropInProgress, dropVerify, dropDone]);

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

  const tasks: Task[] = addTypesToTasks(story.tasks, story.id);
  return (
    <tr>
      <td>
        <StoryCard
          story={story}
          onChange={(s: Story): void => {
            store.saveOrUpdateStory(s);
          }}
          onDelete={(s: Story): void => {
            store.deleteStory(s.id);
          }}
          onAddTask={(): void => {
            store.addEmptyTask(story.id);
          }}
        />
      </td>
      <td
        ref={dropTodoRef}
        style={{ backgroundColor: backgroundColors.todo }}
        className={styles.tableRow}
      >
        <div className={styles.tdContainer}>
          {tasks.map(
            (task) =>
              task.state === 'TODO' && (
                <TaskCard
                  key={task.id}
                  task={task}
                  onChange={(task): void => store.saveOrUpdateTask(task)}
                  onDelete={(task): void => store.deleteTask(task)}
                />
              )
          )}
        </div>
      </td>
      <td
        ref={dropInProgressRef}
        style={{ backgroundColor: backgroundColors.inProgress }}
        className={styles.tableRow}
      >
        <div className={styles.tdContainer}>
          {tasks.map(
            (task) =>
              task.state === 'IN_PROGRESS' && (
                <TaskCard
                  key={task.id}
                  task={task}
                  onChange={(task): void => store.saveOrUpdateTask(task)}
                  onDelete={(task): void => store.deleteTask(task)}
                />
              )
          )}
        </div>
      </td>
      <td
        ref={dropVerifyRef}
        style={{ backgroundColor: backgroundColors.verify }}
        className={styles.tableRow}
      >
        <div className={styles.tdContainer}>
          {tasks.map(
            (task) =>
              task.state === 'VERIFY' && (
                <TaskCard
                  key={task.id}
                  task={task}
                  onChange={(task): void => store.saveOrUpdateTask(task)}
                  onDelete={(task): void => store.deleteTask(task)}
                />
              )
          )}
        </div>
      </td>
      <td
        ref={dropDoneRef}
        style={{ backgroundColor: backgroundColors.done }}
        className={styles.tableRow}
      >
        <div className={styles.tdContainer}>
          {tasks.map(
            (task) =>
              task.state === 'DONE' && (
                <TaskCard
                  key={task.id}
                  task={task}
                  onChange={(task): void => store.saveOrUpdateTask(task)}
                  onDelete={(task): void => store.deleteTask(task)}
                />
              )
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
