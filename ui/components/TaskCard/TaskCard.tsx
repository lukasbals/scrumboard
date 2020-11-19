import styles from './styles.module.scss';
import Task from '../../models/Task';
import ActionIcons from '../ActionIcons';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Input, Form, Button } from 'antd';
import { useDrag } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';

type PropTypes = {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (task: Task) => void;
};
const TaskCard: React.FC<PropTypes> = ({
  task,
  onChange,
  onDelete,
}: PropTypes) => {
  const [form] = Form.useForm();
  const store = useContext(BoardStoreContext);

  const [edit, setEdit] = useState(!!task.new);

  const [{ opacity }, drag] = useDrag({
    item: task,
    canDrag: (): boolean => !edit,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  useEffect(() => {
    if (edit) {
      form.getFieldInstance('description').focus();
    }
  }, [edit]);

  const getUpdatedTask = (): Task => ({
    ...task,
    description: form.getFieldValue('description'),
    username: form.getFieldValue('user'),
  });

  const onSubmit = (): void => {
    onChange(getUpdatedTask());
    setEdit(false);
  };

  return (
    <Form
      form={form}
      initialValues={{ description: task.description, user: task.username }}
      onFinish={onSubmit}
    >
      <div ref={drag} className={styles.taskContainer} style={{ opacity }}>
        <div className={styles.taskHeader}>
          {edit ? (
            <ActionIcons
              icon1={
                <Button
                  className={styles.unstyledButton}
                  type="link"
                  htmlType="submit"
                >
                  <SaveOutlined />
                </Button>
              }
              icon2={
                <CloseOutlined
                  onClick={(): void =>
                    !task.new ? setEdit(false) : store.removeNewTask(task)
                  }
                />
              }
            />
          ) : (
            <ActionIcons
              icon1={<EditOutlined onClick={(): void => setEdit(true)} />}
              icon2={
                <DeleteOutlined
                  onClick={(): void => onDelete(getUpdatedTask())}
                />
              }
            />
          )}
        </div>
        <div className={styles.taskBody}>
          {edit ? (
            <Form.Item name="description" className={styles.formItem}>
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 20 }}
                placeholder="My task"
              />
            </Form.Item>
          ) : (
            <ReactMarkdown>
              {form.getFieldValue('description') ?? task.description}
            </ReactMarkdown>
          )}
        </div>
        <div className={styles.taskFooter}>
          {edit ? (
            <Form.Item name="user" className={styles.formItem}>
              <Input placeholder="User" />
            </Form.Item>
          ) : (
            <div
              className={styles.nameBadge}
              style={{ backgroundColor: task.usercolor }}
            >
              {form.getFieldValue('user') ?? task.username}
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default TaskCard;
