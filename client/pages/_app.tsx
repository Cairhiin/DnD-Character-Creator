import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Roboto_Condensed } from 'next/font/google';
import Layout from '@/components/Layout';
import Nav from '@/components/Nav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav isLoggedIn={ true } />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
