import styles from './index.module.scss';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import createBoard, { FormValues } from '../ui/api/createBoard';
import BoardNameForm from '../ui/components/BoardNameForm';

export const Home = (): JSX.Element => {
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
      <Typography.Paragraph className={styles.text}>
        The simplest task tracking tool for dev teams.
      </Typography.Paragraph>
      <div className={styles.divider} />

      <div className={styles.formContainer}>
        <BoardNameForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Home;
