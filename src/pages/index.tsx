import { ReactNode } from "react";
import Head from "next/head";
import withTypeWriterEffect from "@/features/ui/TypewriterEffect";
import Hero from "@/features/ui/Hero";
import styles from "@/styles/Home.module.scss";
import { useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}

export default function Home() {
  const { data: session, status } = useSession();
  const Header = ({ children }: Props) => (
    <div className={styles.card}>
      <h2 className={styles.header}>{children}</h2>
    </div>
  );
  const HeaderWithTypeWriterEffect = withTypeWriterEffect(Header);

  return (
    <>
      <Head>
        <title>D&D Character Creator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Hero>
          <HeaderWithTypeWriterEffect>
            Create, Level Up, Store, Manage.
          </HeaderWithTypeWriterEffect>
        </Hero>
      </div>
    </>
  );
}
