import { Button, Divider, Form, Input, Typography } from 'antd';
import styles from './styles.module.scss';
import Story from '../../models/Story';
import { useContext, useEffect, useState } from 'react';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import ActionIcons from '../ActionIcons/ActionIcons';
import { BoardStoreContext } from '../../contexts/BoardStoreContext';

type PropTypes = {
  story: Story;
  onChange: (story: Story) => void;
  onDelete: (story: Story) => void;
  onAddTask: () => void;
};

const StoryCard: React.FC<PropTypes> = ({
  story,
  onChange,
  onDelete,
  onAddTask,
}: PropTypes) => {
  const [edit, setEdit] = useState(!!story.new);
  const [form] = Form.useForm();
  const store = useContext(BoardStoreContext);

  useEffect(() => {
    if (edit) {
      form.getFieldInstance('name').focus();
    }
  }, [edit]);

  const onSubmit = (): void => {
    onChange({ ...story, ...form.getFieldsValue() });
    setEdit(false);
  };

  return (
    <Form
      initialValues={story}
      onFinish={onSubmit}
      form={form}
      className={styles.storyContainer}
    >
      <div className={styles.storyBody}>
        {edit ? (
          <>
            <Form.Item name="name" className={styles.formItem}>
              <Input placeholder="Story name" />
            </Form.Item>
            <Form.Item name="link" className={styles.formItem}>
              <Input placeholder="Link to the story" />
            </Form.Item>
          </>
        ) : (
          <>
            <Typography.Title level={4}>
              {form.getFieldValue('name') ?? story.name}
            </Typography.Title>
            {story.link && (
              <a
                href={form.getFieldValue('link') ?? story.link}
                target="__blank"
              >
                Link
              </a>
            )}
          </>
        )}
      </div>

      <div className={styles.storyFooter}>
        <Divider className={styles.divider} />
        <div className={styles.actionsContainer}>
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
                  onClick={(): void => {
                    !story.new
                      ? setEdit(false)
                      : store.removeNewStory(story.id);
                  }}
                />
              }
            />
          ) : (
            <ActionIcons
              icon1={<EditOutlined onClick={(): void => setEdit(true)} />}
              icon2={<DeleteOutlined onClick={(): void => onDelete(story)} />}
            />
          )}

          <Button
            size="small"
            type="primary"
            className={styles.addTaskButton}
            onClick={onAddTask}
          >
            Add task
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default StoryCard;
