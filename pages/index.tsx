import styles from './index.module.scss';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import createBoard, { FormValues } from '../ui/api/createBoard';
import BoardNameForm from '../ui/components/BoardNameForm';

export const Home: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (values: FormValues): Promise<void> => {
    const board = await createBoard(values);
    if (board) {
      router.push(`/${board.name}`);
    }
  };

  return (
    <div className={styles.container}>
      <Typography.Title className={styles.heading}>
        Scrumboard.
      </Typography.Title>
      <Typography.Paragraph type="secondary" className={styles.text}>
        The simplest task tracking tool for dev teams.
      </Typography.Paragraph>
      <div className={styles.divider} />

      <Typography.Paragraph type="secondary">
        Craete new or access existing board
      </Typography.Paragraph>
      <div className={styles.formContainer}>
        <BoardNameForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Home;
