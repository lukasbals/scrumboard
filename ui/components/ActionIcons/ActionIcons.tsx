import styles from './styles.module.scss';

type PropTypes = {
  icon1: JSX.Element;
  icon2: JSX.Element;
};

const ActionIcons: React.FC<PropTypes> = ({ icon1, icon2 }: PropTypes) => {
  return (
    <div className={styles.acionIconContainer}>
      {icon1}
      {icon2}
    </div>
  );
};

export default ActionIcons;
