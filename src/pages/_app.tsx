import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "@/features/ui/Layout";
import Nav from "@/features/ui/Nav";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Nav />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
