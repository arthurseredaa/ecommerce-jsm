import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { StateProvider } from '../context/StateContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}

export default MyApp;
