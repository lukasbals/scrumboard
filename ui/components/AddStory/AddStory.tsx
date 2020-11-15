import { Button } from 'antd';
import styles from './styles.module.scss';

type PropTypes = {
  onClick: () => void;
};

const AddStory: React.FC<PropTypes> = ({ onClick }: PropTypes) => {
  return (
    <div className={styles.buttonContainer}>
      <Button size="small" type="primary" onClick={onClick}>
        Add story
      </Button>
    </div>
  );
};

export default AddStory;
