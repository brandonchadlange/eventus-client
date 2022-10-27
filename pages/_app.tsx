import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        ></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          colors: {
            pink: [
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
              "#fb57af",
            ],
          },
          primaryColor: "pink",
        }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
