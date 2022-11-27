import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import "../styles/pokemons.css";
import Image from "next/image";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>PokeDex</title>
      </Head>
      <div
        style={{
          zIndex: -1,
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Image src="/bg.png" alt="bg" layout="fill" objectFit="cover" />
      </div>
      <Flex justifyContent="center" pt={10}>
        <Image src="/title-logo.png" alt="bg" width={600} height={500} />
      </Flex>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
