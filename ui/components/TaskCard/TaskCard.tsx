import styles from './styles.module.scss';
import Task from '../../models/Task';
import ActionIcons from '../ActionIcons';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { Input, Form, Button, Typography } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';
import User from '../../models/User';
import React from 'react';

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
    type: 'TASK',
    item: task,
    canDrag: (): boolean => !edit,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const dragRef = useRef<HTMLTableCellElement>(null);

  React.useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  }, [dragRef]);

  useEffect(() => {
    if (edit) {
      form.getFieldInstance('description').focus();
    }
  }, [edit]);

  useEffect(() => {
    form.setFieldsValue({ description: task.description, user: task.username });
  }, [task]);

  const getUpdatedTask = (): Task => ({
    ...task,
    description: form.getFieldValue('description'),
    username: form.getFieldValue('user'),
  });

  const onSubmit = (): void => {
    onChange(getUpdatedTask());
    setEdit(false);
  };

  const user = store.users.find((u: User) => task.username === u.username);
  return (
    <Form
      form={form}
      initialValues={{ description: task.description, user: task.username }}
      onFinish={onSubmit}
    >
      <div ref={dragRef} className={styles.taskContainer} style={{ opacity }}>
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
            <Typography.Text>
              <ReactMarkdown>{task.description}</ReactMarkdown>
            </Typography.Text>
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
              style={{ backgroundColor: user ? user.color : '#ffffff' }}
            >
              <Typography.Text>{task.username}</Typography.Text>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default TaskCard;
