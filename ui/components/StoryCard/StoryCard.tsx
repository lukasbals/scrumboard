import { Button, Divider, Form, Input, Typography } from 'antd';
import styles from './styles.module.scss';
import Story from '../../models/Story';
import { useState } from 'react';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import ActionIcons from '../ActionIcons/ActionIcons';

type PropTypes = {
  story: Story;
  onChange: (story: Story) => void;
  onDelete: (story: Story) => void;
};

const StoryCard = ({ story, onChange, onDelete }: PropTypes): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = (): void => {
    onChange(form.getFieldsValue());
    setEdit(false);
  };

  return (
    <div className={styles.storyContainer}>
      <Form initialValues={story} onFinish={onSubmit} form={form}>
        {edit ? (
          <>
            <Form.Item name="name" className={styles.firstFormItem}>
              <Input />
            </Form.Item>

            <Form.Item name="link">
              <Input />
            </Form.Item>
          </>
        ) : (
          <>
            <Typography.Title level={4}>
              {form.getFieldValue('name')}
            </Typography.Title>
            <a href={form.getFieldValue('link')} target="__blank">
              Link
            </a>
          </>
        )}

        <Divider />
        <div className={styles.actionContainer}>
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
              icon2={<CloseOutlined onClick={(): void => setEdit(false)} />}
            />
          ) : (
            <ActionIcons
              icon1={<EditOutlined onClick={(): void => setEdit(true)} />}
              icon2={<DeleteOutlined onClick={(): void => onDelete(story)} />}
            />
          )}

          <Button size="small" type="primary" className={styles.addTaskButton}>
            Add task
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StoryCard;
