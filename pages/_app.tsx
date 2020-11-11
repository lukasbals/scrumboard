import '../styles/global.css';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />;
};

export default MyApp;
