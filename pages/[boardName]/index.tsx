import { Card, Typography } from 'antd';
import styles from './index.module.scss';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Story from '../../ui/models/Story';
import StoryCard from '../../ui/components/StoryCard';

export const Board = (): JSX.Element => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>
            <Typography.Title level={4}>Todo</Typography.Title>
          </th>
          <th>
            <Typography.Title level={4}>In progress</Typography.Title>
          </th>
          <th>
            <Typography.Title level={4}>Verify</Typography.Title>
          </th>
          <th>
            <Typography.Title level={4}>Done</Typography.Title>
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
          <td>
            <Card
              size="small"
              className={styles.card}
              extra={
                <>
                  <EditOutlined className={styles.icon} size={20} />
                  <DeleteOutlined className={styles.icon} size={29} />
                </>
              }
            >
              Task 1
            </Card>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Board;
