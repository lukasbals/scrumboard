import { Button, Form, Input, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { boardNameRegex } from '../../../constants';
import { FormValues } from '../../api/createBoard';
import styles from './styles.module.scss';

type PropTypes = {
  onSubmit: (values: FormValues) => Promise<void>;
};

const BoardNameForm: React.FC<PropTypes> = ({ onSubmit }: PropTypes) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [existingBoard, setExistingBoard] = useState<boolean>(false);
  const [valid, setValid] = useState(false);

  const validateBoardName = async (
    rules: object,
    value: string
  ): Promise<void> => {
    setExistingBoard(false);
    setValid(false);
    if (value === '') {
      return Promise.reject('Please enter a board name!');
    }
    if (!boardNameRegex.test(value)) {
      return Promise.reject(
        <span>
          Board name needs to be URL safe
          <br />
          Example: my-board-1
        </span>
      );
    }
    const { status } = await fetch(`/api/boards/${value}`);
    if (status === 200) {
      setExistingBoard(true);
    }
    setValid(true);
    return Promise.resolve();
  };

  const onFinish = (values: FormValues): void => {
    if (existingBoard) {
      router.push(`/${form.getFieldValue('boardName')}`);
      return;
    }
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
      {form?.getFieldValue('boardName') !== '' && (
        <Form.Item>
          {existingBoard ? (
            <Tooltip title="This board exists already. Do you want to access it?">
              <Button
                size="large"
                type="default"
                htmlType="submit"
                disabled={!valid}
              >
                Access board
              </Button>
            </Tooltip>
          ) : (
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              disabled={!valid}
            >
              Create board
            </Button>
          )}
        </Form.Item>
      )}
    </Form>
  );
};

export default BoardNameForm;
