import Head from 'next/head';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>D&D Character Creator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <h1>D&D Character Manager</h1>
      </div>
    </>
  )
}
