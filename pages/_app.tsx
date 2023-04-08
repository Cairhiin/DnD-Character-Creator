import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ inter.className }>
      <Nav />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
