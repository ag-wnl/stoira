import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import "~/styles/globals.css";

const theme = extendTheme({
  styles: {
    global: {
      // Setting the background color globally
      body: {
        bg: '#000000',  
      },
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
       <ChakraProvider theme={theme}>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
