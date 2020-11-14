import { Typography } from 'antd';
import TableRow from '../TableRow';
import styles from './styles.module.scss';

const Board: React.FC = () => {
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
          {/* Todo: Iterate over stories here */}
          <TableRow />
        </tbody>
      </table>
    </div>
  );
};

export default Board;
