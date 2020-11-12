import styles from './index.module.css';
import { Typography, Input, Form, Button } from 'antd';
import { boardNameRegex } from '../constants';

type FormValues = {
  boardName: string;
};

export const Home = (): JSX.Element => {
  const [form] = Form.useForm();

  const onSubmit = (values: FormValues): void => {
    if (form.validateFields()) {
      fetch('/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.boardName,
        }),
      });
    }
  };

  const validateBoardName = async (
    rules: object,
    value: string,
  ): Promise<void> => {
    if (value === '') {
      return Promise.reject('Please enter a board name!');
    }
    if (!boardNameRegex.test(value)) {
      return Promise.reject(
        <span>
          Board name needs to be URL safe
          <br />
          Example: my-board
        </span>,
      );
    }
    const { status } = await fetch(`/api/boards/${value}`);
    if (status === 200) {
      return Promise.reject('This board exists already!');
    } else {
      return Promise.resolve();
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
        <Form form={form} layout="inline" onFinish={onSubmit}>
          <Form.Item
            name="boardName"
            rules={[{ validator: validateBoardName }]}
            hasFeedback
          >
            <Input
              className={styles.input}
              size="large"
              placeholder="Enter board name ..."
            />
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Create board
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Home;
