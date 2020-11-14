import { Button, Form, Input } from 'antd';
import { boardNameRegex } from '../../../constants';
import { FormValues } from '../../api/createBoard';
import styles from './styles.module.scss';

type PropTypes = {
  onSubmit: (values: FormValues) => Promise<void>;
};

const BoardNameForm: React.FC<PropTypes> = ({ onSubmit }: PropTypes) => {
  const [form] = Form.useForm();

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

  const onFinish = (values: FormValues): void => {
    if (form.validateFields()) {
      onSubmit(values);
    }
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      initialValues={{ boardName: '' }}
    >
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
  );
};

export default BoardNameForm;
