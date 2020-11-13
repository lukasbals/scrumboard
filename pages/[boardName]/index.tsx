import { Typography } from 'antd';
import styles from './index.module.scss';
import Story from '../../ui/models/Story';
import StoryCard from '../../ui/components/StoryCard';
import TaskCard from '../../ui/components/TaskCard';

export const Board = (): JSX.Element => {
  const x = (
    <TaskCard
      task={{
        description: 'Task 1',
        user: { name: 'Lukas', color: '#5faaa6' },
      }}
      onChange={(task): void => console.log('On change: ', task)}
      onDelete={(task): void => console.log('On delete: ', task)}
    />
  );
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>
              <Typography.Title level={4}>
                <div className={styles.verticalDivider} />
                Todo
              </Typography.Title>
            </th>
            <th>
              <Typography.Title level={4}>
                <div className={styles.verticalDivider} />
                In progress
              </Typography.Title>
            </th>
            <th>
              <Typography.Title level={4}>
                <div className={styles.verticalDivider} />
                Verify
              </Typography.Title>
            </th>
            <th>
              <Typography.Title level={4}>
                <div className={styles.verticalDivider} />
                Done
              </Typography.Title>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <StoryCard
                story={{ name: 'Story 1', link: 'https://apple.com' }}
                onChange={(story: Story): void => {
                  console.log('Edit: ', story);
                }}
                onDelete={(story): void => console.log('Delete: ', story)}
              />
            </td>
            <td></td>

            <td></td>
            <td>
              <div className={styles.tdContainer}>
                {x}
                {x}
                {x}
              </div>
            </td>
            <td>
              <div className={styles.tdContainer}>{x}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Board;
