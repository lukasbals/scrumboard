import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { JSX, useContext, useEffect, useState } from 'react';
import Story from '../../models/Story';
import BoardStore from '../../stores/BoardStore';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';
import TableRow from '../TableRow';
import styles from './styles.module.scss';
import AddStory from '../AddStory';
import { io } from 'socket.io-client';
import { WEBSOCKET_EVENTS } from '../../../constants';

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

  useEffect(() => {
    const socket = io({ query: { boardName: store.boardName } });

    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    WEBSOCKET_EVENTS.forEach((event) => {
      socket.on(event.name, (message) => {
        store[event.uiStoreFunction](message);
      });
    });

    store.setSocket(socket);

    return (): void => {
      socket.close();
    };
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
            )
          )}
        </tbody>
      </table>
      <AddStory onClick={(): void => store.addEmptyStory()} />
    </div>
  );
};

export default observer(Board);
