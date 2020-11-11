import Head from 'next/head';
import styles from './index.module.css';

export const Home = (): JSX.Element => (
  <div className={styles.container}>
    <Head>
      <div>Some header</div>
    </Head>
    <h1>Scrumboard</h1>
  </div>
);

export default Home;
