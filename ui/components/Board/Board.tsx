import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import Story from '../../models/Story';
import BoardStore from '../../stores/BoardStore';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';
import TableRow from '../TableRow';
import styles from './styles.module.scss';
import AddStory from '../AddStory';

const Board: React.FC = () => {
  const store: BoardStore = useContext(BoardStoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      await store.loadData();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <AddStory onClick={(): void => store.addStory()} />
    </div>
  );
};

export default observer(Board);
