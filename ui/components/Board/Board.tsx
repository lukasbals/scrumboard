import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import Story from '../../models/Story';
import BoardStore from '../../stores/BoardStore';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';
import TableRow from '../TableRow';
import styles from './styles.module.scss';

const Board: React.FC = () => {
  const store: BoardStore = useContext(BoardStoreContext);

  useEffect(() => {
    store.loadStories();
  }, []);

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
          {store.stories.map(
            (story: Story): JSX.Element => (
              <TableRow key={story.id} story={story} />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default observer(Board);
