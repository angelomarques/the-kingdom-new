import '../styles/globals.css';
import type { AppProps } from 'next/app';

import '@fontsource/inter';
import '@fontsource/inter/600.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
