import { JSX } from 'react';
import '../styles/global.scss';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />;
};

export default MyApp;
