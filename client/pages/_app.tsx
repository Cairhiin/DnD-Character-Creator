import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Roboto_Condensed } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';
import Nav from '@/components/Nav';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={ session }>
      <Nav isLoggedIn={ true } />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
